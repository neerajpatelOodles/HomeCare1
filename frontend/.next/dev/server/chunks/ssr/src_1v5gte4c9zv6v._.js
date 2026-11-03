(()=>{"use strict";module.exports = [
"[project]/src/components/ProtectedRoute.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$roles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/roles.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ProtectedRoute({ roles, role, children }) {
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const allowed = roles || [
        role
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loading) return;
        if (!user) router.replace('/login');
        else if (!allowed.includes(user.role)) router.replace(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$roles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_HOME"][user.role]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user,
        loading,
        router
    ]);
    if (loading || !user || !allowed.includes(user.role)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "center-screen",
            role: "status",
            "aria-live": "polite",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "spinner"
            }, void 0, false, {
                fileName: "[project]/src/components/ProtectedRoute.js",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ProtectedRoute.js",
            lineNumber: 28,
            columnNumber: 7
        }, this);
    }
    return children;
}
}),
"[project]/src/lib/roles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NAV",
    ()=>NAV,
    "ROLE_HOME",
    ()=>ROLE_HOME,
    "ROLE_LABEL",
    ()=>ROLE_LABEL
]);
const ROLE_HOME = {
    client: '/client/dashboard',
    staff: '/staff/dashboard',
    caregiver: '/caregiver/dashboard',
    admin: '/admin/dashboard',
    hr: '/hr/dashboard'
};
const ROLE_LABEL = {
    client: 'Client',
    staff: 'Staff',
    caregiver: 'Caregiver',
    admin: 'Admin',
    hr: 'HR'
};
const NAV = {
    admin: [
        {
            href: '/admin/dashboard',
            label: 'Dashboard'
        },
        {
            href: '/admin/visits',
            label: 'Schedule'
        },
        {
            href: '/admin/clients',
            label: 'Clients'
        },
        {
            href: '/hr/applicants',
            label: 'Applicants'
        },
        {
            href: '/hr/caregivers',
            label: 'Caregivers'
        },
        {
            href: '/admin/users',
            label: 'Users'
        }
    ],
    hr: [
        {
            href: '/hr/dashboard',
            label: 'Dashboard'
        },
        {
            href: '/hr/applicants',
            label: 'Applicants'
        },
        {
            href: '/hr/caregivers',
            label: 'Caregivers'
        },
        {
            href: '/admin/users',
            label: 'Users'
        }
    ],
    staff: [
        {
            href: '/staff/dashboard',
            label: 'Dashboard'
        }
    ],
    caregiver: [
        {
            href: '/caregiver/dashboard',
            label: 'Dashboard'
        },
        {
            href: '/caregiver/visits',
            label: 'My visits'
        }
    ],
    client: [
        {
            href: '/client/dashboard',
            label: 'Dashboard'
        },
        {
            href: '/client/visits',
            label: 'Visits'
        },
        {
            href: '/client/care-plan',
            label: 'Care plan'
        }
    ]
};
}),
];})()

//# sourceMappingURL=src_1v5gte4c9zv6v._.js.map