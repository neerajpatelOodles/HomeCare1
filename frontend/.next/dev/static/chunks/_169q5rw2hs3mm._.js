(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/src/components/ProtectedRoute.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/roles.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProtectedRoute({ roles, role, children }) {
    _s();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const allowed = roles || [
        role
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            if (loading) return;
            if (!user) router.replace('/login');
            else if (!allowed.includes(user.role)) router.replace(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_HOME"][user.role]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ProtectedRoute.useEffect"], [
        user,
        loading,
        router
    ]);
    if (loading || !user || !allowed.includes(user.role)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "center-screen",
            role: "status",
            "aria-live": "polite",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(ProtectedRoute, "Zr2WDa/YWeMetzDhcnOimt0LiKE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/roles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_169q5rw2hs3mm._.js.map