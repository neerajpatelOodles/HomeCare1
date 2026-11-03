/**
 * Central route registry. To add a new module:
 *   1. copy src/modules/_template to src/modules/<name>
 *   2. add a numbered SQL file in src/db/migrations
 *   3. register the module's router below
 */
const router = require('express').Router();
const authenticate = require('./middleware/authenticate');
const { authorizeRoles } = require('./middleware/authorize');
const { ROLES } = require('./utils/constants');

const visits = require('./modules/visits/visits.routes');
const asyncHandler = require('./utils/asyncHandler');
const caregiversService = require('./modules/caregivers/caregivers.service');

router.get('/health', (_req, res) => res.json({ success: true, status: 'ok' }));

// ---- Public ---------------------------------------------------------------
router.use('/auth', require('./modules/auth/auth.routes'));
router.use('/recruitment', require('./modules/recruitment/recruitment.routes')); // job application form

// ---- Portals (each router enforces its own login + permissions) -----------
router.use('/dashboard', require('./modules/dashboard/dashboard.routes'));
router.use('/caregiver/visits', authenticate, visits.caregiver);
// A caregiver can read (not change) their own availability and service areas.
router.get('/caregiver/availability', authenticate, authorizeRoles(ROLES.CAREGIVER), asyncHandler(async (req, res) => {
  const d = await caregiversService.details(req.user.id);
  res.json({ success: true, data: { availability: d.availability, serviceAreas: d.serviceAreas } });
}));
router.use('/client/visits', authenticate, visits.client);
router.use('/client/care-plan', authenticate, visits.carePlan);

// ---- HR + Admin -------------------------------------------------------------
router.use('/hr/applicants', authenticate, authorizeRoles(ROLES.HR, ROLES.ADMIN), require('./modules/applicants/applicants.routes'));
router.use('/caregivers', authenticate, authorizeRoles(ROLES.HR, ROLES.ADMIN), require('./modules/caregivers/caregivers.routes'));
router.use('/admin/users', authenticate, authorizeRoles(ROLES.HR, ROLES.ADMIN), require('./modules/users/users.routes'));

// ---- Admin only -------------------------------------------------------------
router.use('/clients', authenticate, authorizeRoles(ROLES.ADMIN), require('./modules/clients/clients.routes'));
router.use('/visits', authenticate, authorizeRoles(ROLES.ADMIN), visits.admin);

module.exports = router;
