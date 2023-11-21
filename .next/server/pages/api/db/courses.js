"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/db/courses";
exports.ids = ["pages/api/db/courses"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "firebase-admin/app":
/*!*************************************!*\
  !*** external "firebase-admin/app" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("firebase-admin/app");;

/***/ }),

/***/ "firebase-admin/auth":
/*!**************************************!*\
  !*** external "firebase-admin/auth" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("firebase-admin/auth");;

/***/ }),

/***/ "(api)/./src/pages/api/db/courses/index.ts":
/*!*******************************************!*\
  !*** ./src/pages/api/db/courses/index.ts ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ coursesHandler)\n/* harmony export */ });\n/* harmony import */ var _utils_firebaseAdminInit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/firebaseAdminInit */ \"(api)/./src/utils/firebaseAdminInit.ts\");\n/* harmony import */ var _utils_prismaClientInit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/prismaClientInit */ \"(api)/./src/utils/prismaClientInit.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_firebaseAdminInit__WEBPACK_IMPORTED_MODULE_0__]);\n_utils_firebaseAdminInit__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nasync function coursesHandler(req, res) {\n    const { method , headers , body , query  } = req;\n    switch(method){\n        case \"GET\":\n            try {\n                if (query.id) {\n                    const course = await _utils_prismaClientInit__WEBPACK_IMPORTED_MODULE_1__.prisma.course.findUnique({\n                        where: {\n                            id: parseInt(query.id)\n                        },\n                        select: {\n                            id: true,\n                            title: true,\n                            code: true,\n                            anonymous: true,\n                            instructor_id: true,\n                            created_by_id: true,\n                            _count: {\n                                select: {\n                                    reviews: true\n                                }\n                            },\n                            reviews: {\n                                select: {\n                                    comment: true,\n                                    user: {\n                                        select: {\n                                            name: true\n                                        }\n                                    },\n                                    upvotes: {\n                                        select: {\n                                            user_id: true\n                                        }\n                                    },\n                                    anonymous: true,\n                                    user_id: true,\n                                    rating: true,\n                                    id: true,\n                                    _count: {\n                                        select: {\n                                            upvotes: true\n                                        }\n                                    }\n                                }\n                            },\n                            created_by: {\n                                select: {\n                                    name: true\n                                }\n                            },\n                            instructor: {\n                                select: {\n                                    name: true\n                                }\n                            }\n                        }\n                    });\n                    res.status(200).json({\n                        message: \"Course Fetched\",\n                        result: course\n                    });\n                } else {\n                    const courses = await _utils_prismaClientInit__WEBPACK_IMPORTED_MODULE_1__.prisma.course.findMany({\n                        include: {\n                            created_by: {\n                                select: {\n                                    name: true\n                                }\n                            },\n                            instructor: {\n                                select: {\n                                    name: true\n                                }\n                            },\n                            _count: {\n                                select: {\n                                    reviews: true\n                                }\n                            }\n                        }\n                    });\n                    res.status(200).json({\n                        message: \"Courses Fetched\",\n                        result: courses\n                    });\n                }\n            } catch (err) {\n                res.status(404).json({\n                    message: err\n                });\n            }\n            break;\n        case \"POST\":\n            if (headers && headers.authorization) {\n                const accessToken = headers.authorization.split(\" \")[1];\n                const user = await _utils_firebaseAdminInit__WEBPACK_IMPORTED_MODULE_0__.adminAuth.verifyIdToken(accessToken);\n                if (user) {\n                    const { title , code , instructorId , isAnonymous  } = body;\n                    const course1 = await _utils_prismaClientInit__WEBPACK_IMPORTED_MODULE_1__.prisma.course.findUnique({\n                        where: {\n                            instructor_id_code: {\n                                code: code,\n                                instructor_id: instructorId\n                            }\n                        }\n                    });\n                    if (course1) {\n                        res.status(405).json({\n                            message: \"Course Code already exists\"\n                        });\n                    } else {\n                        try {\n                            await _utils_prismaClientInit__WEBPACK_IMPORTED_MODULE_1__.prisma.course.create({\n                                data: {\n                                    title: title,\n                                    code: code,\n                                    instructor_id: instructorId,\n                                    anonymous: isAnonymous,\n                                    created_by_id: user.user_id\n                                }\n                            });\n                            res.status(201).json({\n                                message: \"New Course Created\"\n                            });\n                        } catch (err1) {\n                            res.status(404).json({\n                                message: err1\n                            });\n                        }\n                    }\n                } else {\n                    res.status(401).json({\n                        message: \"Unauthorized Access\"\n                    });\n                }\n            } else {\n                res.status(401).json({\n                    message: \"Unauthorized Access\"\n                });\n            }\n            break;\n        case \"PUT\":\n            if (headers && headers.authorization) {\n                const accessToken1 = headers.authorization.split(\" \")[1];\n                const user1 = await _utils_firebaseAdminInit__WEBPACK_IMPORTED_MODULE_0__.adminAuth.verifyIdToken(accessToken1);\n                if (user1) {\n                    const { id  } = query;\n                    const { title: title1 , code: code1 , instructorId: instructorId1 , isAnonymous: isAnonymous1  } = body;\n                    try {\n                        await _utils_prismaClientInit__WEBPACK_IMPORTED_MODULE_1__.prisma.course.update({\n                            where: {\n                                id: parseInt(id)\n                            },\n                            data: {\n                                title: title1,\n                                code: code1,\n                                instructor_id: instructorId1,\n                                anonymous: isAnonymous1\n                            }\n                        });\n                        res.status(201).json({\n                            message: \"Course Updated\"\n                        });\n                    } catch (err2) {\n                        if (err2 instanceof _prisma_client__WEBPACK_IMPORTED_MODULE_2__.Prisma.PrismaClientKnownRequestError) {\n                            if (err2.code === \"P2002\") {\n                                res.status(404).json({\n                                    message: \"Course Code already exists\"\n                                });\n                            } else {\n                                res.status(404).json({\n                                    message: err2\n                                });\n                            }\n                        } else {\n                            res.status(404).json({\n                                message: err2\n                            });\n                        }\n                    }\n                } else {\n                    res.status(401).json({\n                        message: \"Unauthorized Access\"\n                    });\n                }\n            } else {\n                res.status(401).json({\n                    message: \"Unauthorized Access\"\n                });\n            }\n            break;\n        case \"DELETE\":\n            if (headers && headers.authorization) {\n                const accessToken2 = headers.authorization.split(\" \")[1];\n                const user2 = await _utils_firebaseAdminInit__WEBPACK_IMPORTED_MODULE_0__.adminAuth.verifyIdToken(accessToken2);\n                if (user2) {\n                    const { id: id1  } = query;\n                    try {\n                        await _utils_prismaClientInit__WEBPACK_IMPORTED_MODULE_1__.prisma.course[\"delete\"]({\n                            where: {\n                                id: parseInt(id1)\n                            }\n                        });\n                        res.status(200).json({\n                            message: \"Course Deleted Successfully\"\n                        });\n                    } catch (err3) {\n                        res.status(404).json({\n                            message: err3\n                        });\n                    }\n                } else {\n                    res.status(401).json({\n                        message: \"Unauthorized Access\"\n                    });\n                }\n            } else {\n                res.status(401).json({\n                    message: \"Unauthorized Access\"\n                });\n            }\n            break;\n        default:\n            res.status(405).json({\n                message: \"Method Not Allowed\"\n            });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2RiL2NvdXJzZXMvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDK0Q7QUFDSjtBQUNwQjtBQUV4QixlQUFlRyxlQUMxQkMsR0FBbUIsRUFDbkJDLEdBQW9CLEVBQ3RCO0lBQ0UsTUFBTSxFQUFFQyxPQUFNLEVBQUVDLFFBQU8sRUFBRUMsS0FBSSxFQUFFQyxNQUFLLEVBQUUsR0FBR0w7SUFFekMsT0FBUUU7UUFDSixLQUFLO1lBQ0QsSUFBSTtnQkFDQSxJQUFJRyxNQUFNQyxFQUFFLEVBQUU7b0JBQ1YsTUFBTUMsU0FBUyxNQUFNViw2RUFBd0IsQ0FBQzt3QkFDMUNZLE9BQU87NEJBQ0hILElBQUlJLFNBQVNMLE1BQU1DLEVBQUU7d0JBQ3pCO3dCQUNBSyxRQUFROzRCQUNKTCxJQUFJLElBQUk7NEJBQ1JNLE9BQU8sSUFBSTs0QkFDWEMsTUFBTSxJQUFJOzRCQUNWQyxXQUFXLElBQUk7NEJBQ2ZDLGVBQWUsSUFBSTs0QkFDbkJDLGVBQWUsSUFBSTs0QkFDbkJDLFFBQVE7Z0NBQ0pOLFFBQVE7b0NBQ0pPLFNBQVMsSUFBSTtnQ0FDakI7NEJBQ0o7NEJBQ0FBLFNBQVM7Z0NBQ0xQLFFBQVE7b0NBQ0pRLFNBQVMsSUFBSTtvQ0FDYkMsTUFBTTt3Q0FDRlQsUUFBUTs0Q0FDSlUsTUFBTSxJQUFJO3dDQUNkO29DQUNKO29DQUNBQyxTQUFTO3dDQUNMWCxRQUFROzRDQUNKWSxTQUFTLElBQUk7d0NBQ2pCO29DQUNKO29DQUNBVCxXQUFXLElBQUk7b0NBQ2ZTLFNBQVMsSUFBSTtvQ0FDYkMsUUFBUSxJQUFJO29DQUNabEIsSUFBSSxJQUFJO29DQUNSVyxRQUFRO3dDQUNKTixRQUFROzRDQUNKVyxTQUFTLElBQUk7d0NBQ2pCO29DQUNKO2dDQUNKOzRCQUNKOzRCQUNBRyxZQUFZO2dDQUNSZCxRQUFRO29DQUNKVSxNQUFNLElBQUk7Z0NBQ2Q7NEJBQ0o7NEJBQ0FLLFlBQVk7Z0NBQ1JmLFFBQVE7b0NBQ0pVLE1B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LFNBQVNKOzRCQUNqQjt3QkFDSjt3QkFDQUwsSUFBSTBCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7NEJBQ2pCQyxTQUFTO3dCQUNiO29CQUNKLEVBQUUsT0FBT0ssTUFBVTt3QkFDZmpDLElBQUkwQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDOzRCQUNqQkMsU0FBU0s7d0JBQ2I7b0JBQ0o7Z0JBQ0osT0FBTztvQkFDSGpDLElBQUkwQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO3dCQUNqQkMsU0FBUztvQkFDYjtnQkFDSixDQUFDO1lBQ0wsT0FBTztnQkFDSDVCLElBQUkwQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO29CQUNqQkMsU0FBUztnQkFDYjtZQUNKLENBQUM7WUFDRCxLQUFLO1FBQ1Q7WUFDSTVCLElBQUkwQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUNqQkMsU0FBUztZQUNiO0lBQ1I7QUFDSixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25vd2xlZGdlLXNoYXJpbmctYXBwLy4vc3JjL3BhZ2VzL2FwaS9kYi9jb3Vyc2VzL2luZGV4LnRzPzBmMjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCB7IGFkbWluQXV0aCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2ZpcmViYXNlQWRtaW5Jbml0J1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvcHJpc21hQ2xpZW50SW5pdCdcbmltcG9ydCB7IFByaXNtYSB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBjb3Vyc2VzSGFuZGxlcihcbiAgICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICAgIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgICBjb25zdCB7IG1ldGhvZCwgaGVhZGVycywgYm9keSwgcXVlcnkgfSA9IHJlcVxuXG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdXJzZSA9IGF3YWl0IHByaXNtYS5jb3Vyc2UuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwYXJzZUludChxdWVyeS5pZCBhcyBzdHJpbmcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5vbnltb3VzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0b3JfaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZF9ieV9pZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXdzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cHZvdGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbm9ueW1vdXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRfYnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0NvdXJzZSBGZXRjaGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogY291cnNlLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdXJzZXMgPSBhd2FpdCBwcmlzbWEuY291cnNlLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2J5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0NvdXJzZXMgRmV0Y2hlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGNvdXJzZXMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycixcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnUE9TVCc6XG4gICAgICAgICAgICBpZiAoaGVhZGVycyAmJiBoZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGhlYWRlcnMuYXV0aG9yaXphdGlvbi5zcGxpdCgnICcpWzFdXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGFkbWluQXV0aC52ZXJpZnlJZFRva2VuKGFjY2Vzc1Rva2VuISlcblxuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIGNvZGUsIGluc3RydWN0b3JJZCwgaXNBbm9ueW1vdXMgfSA9IGJvZHlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291cnNlID0gYXdhaXQgcHJpc21hLmNvdXJzZS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rvcl9pZF9jb2RlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0b3JfaWQ6IGluc3RydWN0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY291cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwNSkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0NvdXJzZSBDb2RlIGFscmVhZHkgZXhpc3RzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS5jb3Vyc2UuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0b3JfaWQ6IGluc3RydWN0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2J5X2lkOiB1c2VyLnVzZXJfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ05ldyBDb3Vyc2UgQ3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDQpLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQgQWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCBBY2Nlc3MnLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdQVVQnOlxuICAgICAgICAgICAgaWYgKGhlYWRlcnMgJiYgaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBoZWFkZXJzLmF1dGhvcml6YXRpb24uc3BsaXQoJyAnKVsxXVxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhZG1pbkF1dGgudmVyaWZ5SWRUb2tlbihhY2Nlc3NUb2tlbiEpXG5cbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSBxdWVyeVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHRpdGxlLCBjb2RlLCBpbnN0cnVjdG9ySWQsIGlzQW5vbnltb3VzIH0gPSBib2R5XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS5jb3Vyc2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcGFyc2VJbnQoaWQgYXMgc3RyaW5nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdG9yX2lkOiBpbnN0cnVjdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnQ291cnNlIFVwZGF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgaW5zdGFuY2VvZiBQcmlzbWEuUHJpc21hQ2xpZW50S25vd25SZXF1ZXN0RXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ1AyMDAyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnQ291cnNlIENvZGUgYWxyZWFkeSBleGlzdHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVW5hdXRob3JpemVkIEFjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQgQWNjZXNzJyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICAgICAgaWYgKGhlYWRlcnMgJiYgaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBoZWFkZXJzLmF1dGhvcml6YXRpb24uc3BsaXQoJyAnKVsxXVxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhZG1pbkF1dGgudmVyaWZ5SWRUb2tlbihhY2Nlc3NUb2tlbiEpXG5cbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSBxdWVyeVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJpc21hLmNvdXJzZS5kZWxldGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwYXJzZUludChpZCBhcyBzdHJpbmcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdDb3Vyc2UgRGVsZXRlZCBTdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCBBY2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVW5hdXRob3JpemVkIEFjY2VzcycsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwNSkuanNvbih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ01ldGhvZCBOb3QgQWxsb3dlZCcsXG4gICAgICAgICAgICB9KVxuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJhZG1pbkF1dGgiLCJwcmlzbWEiLCJQcmlzbWEiLCJjb3Vyc2VzSGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwicXVlcnkiLCJpZCIsImNvdXJzZSIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInBhcnNlSW50Iiwic2VsZWN0IiwidGl0bGUiLCJjb2RlIiwiYW5vbnltb3VzIiwiaW5zdHJ1Y3Rvcl9pZCIsImNyZWF0ZWRfYnlfaWQiLCJfY291bnQiLCJyZXZpZXdzIiwiY29tbWVudCIsInVzZXIiLCJuYW1lIiwidXB2b3RlcyIsInVzZXJfaWQiLCJyYXRpbmciLCJjcmVhdGVkX2J5IiwiaW5zdHJ1Y3RvciIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwicmVzdWx0IiwiY291cnNlcyIsImZpbmRNYW55IiwiaW5jbHVkZSIsImVyciIsImF1dGhvcml6YXRpb24iLCJhY2Nlc3NUb2tlbiIsInNwbGl0IiwidmVyaWZ5SWRUb2tlbiIsImluc3RydWN0b3JJZCIsImlzQW5vbnltb3VzIiwiaW5zdHJ1Y3Rvcl9pZF9jb2RlIiwiY3JlYXRlIiwiZGF0YSIsInVwZGF0ZSIsIlByaXNtYUNsaWVudEtub3duUmVxdWVzdEVycm9yIiwiZGVsZXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/db/courses/index.ts\n");

/***/ }),

/***/ "(api)/./src/utils/firebaseAdminInit.ts":
/*!****************************************!*\
  !*** ./src/utils/firebaseAdminInit.ts ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"adminAuth\": () => (/* binding */ adminAuth)\n/* harmony export */ });\n/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-admin/app */ \"firebase-admin/app\");\n/* harmony import */ var firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase-admin/auth */ \"firebase-admin/auth\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__, firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__]);\n([firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__, firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\nconst { privateKey  } = JSON.parse(process.env.PRIVATE_KEY);\nconst credentials = {\n    projectId: process.env.PROJECT_ID,\n    privateKey: privateKey,\n    clientEmail: process.env.CLIENT_EMAIL\n};\nconst options = {\n    credential: (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__.cert)(credentials),\n    databaseURL: process.env.databaseURL\n};\nfunction createFirebaseAdminApp(config) {\n    if ((0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length === 0) {\n        return (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(config);\n    } else {\n        return (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_0__.getApp)();\n    }\n}\nconst firebaseAdmin = createFirebaseAdminApp(options);\nconst adminAuth = (0,firebase_admin_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(firebaseAdmin);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvZmlyZWJhc2VBZG1pbkluaXQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTzJCO0FBQ2tCO0FBRTdDLE1BQU0sRUFBRUssV0FBVSxFQUFFLEdBQUdDLEtBQUtDLEtBQUssQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXO0FBRXpELE1BQU1DLGNBQThCO0lBQ2hDQyxXQUFXSixRQUFRQyxHQUFHLENBQUNJLFVBQVU7SUFDakNSLFlBQVlBO0lBQ1pTLGFBQWFOLFFBQVFDLEdBQUcsQ0FBQ00sWUFBWTtBQUN6QztBQUVBLE1BQU1DLFVBQXNCO0lBQ3hCQyxZQUFZakIsd0RBQUlBLENBQUNXO0lBQ2pCTyxhQUFhVixRQUFRQyxHQUFHLENBQUNTLFdBQVc7QUFDeEM7QUFFQSxTQUFTQyx1QkFBdUJDLE1BQWtCLEVBQUU7SUFDaEQsSUFBSWxCLDJEQUFPQSxHQUFHbUIsTUFBTSxLQUFLLEdBQUc7UUFDeEIsT0FBT2xCLGlFQUFhQSxDQUFDaUI7SUFDekIsT0FBTztRQUNILE9BQU9uQiwwREFBTUE7SUFDakIsQ0FBQztBQUNMO0FBRUEsTUFBTXFCLGdCQUFnQkgsdUJBQXVCSDtBQUN0QyxNQUFNTyxZQUFZbkIsNERBQU9BLENBQUNrQixlQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25vd2xlZGdlLXNoYXJpbmctYXBwLy4vc3JjL3V0aWxzL2ZpcmViYXNlQWRtaW5Jbml0LnRzP2Y0ZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBcHBPcHRpb25zLFxuICAgIGNlcnQsXG4gICAgZ2V0QXBwLFxuICAgIGdldEFwcHMsXG4gICAgaW5pdGlhbGl6ZUFwcCxcbiAgICBTZXJ2aWNlQWNjb3VudCxcbn0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vYXBwJ1xuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlLWFkbWluL2F1dGgnXG5cbmNvbnN0IHsgcHJpdmF0ZUtleSB9ID0gSlNPTi5wYXJzZShwcm9jZXNzLmVudi5QUklWQVRFX0tFWSEpXG5cbmNvbnN0IGNyZWRlbnRpYWxzOiBTZXJ2aWNlQWNjb3VudCA9IHtcbiAgICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52LlBST0pFQ1RfSUQsXG4gICAgcHJpdmF0ZUtleTogcHJpdmF0ZUtleSxcbiAgICBjbGllbnRFbWFpbDogcHJvY2Vzcy5lbnYuQ0xJRU5UX0VNQUlMLFxufVxuXG5jb25zdCBvcHRpb25zOiBBcHBPcHRpb25zID0ge1xuICAgIGNyZWRlbnRpYWw6IGNlcnQoY3JlZGVudGlhbHMpLFxuICAgIGRhdGFiYXNlVVJMOiBwcm9jZXNzLmVudi5kYXRhYmFzZVVSTCxcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmlyZWJhc2VBZG1pbkFwcChjb25maWc6IEFwcE9wdGlvbnMpIHtcbiAgICBpZiAoZ2V0QXBwcygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZUFwcChjb25maWcpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEFwcCgpXG4gICAgfVxufVxuXG5jb25zdCBmaXJlYmFzZUFkbWluID0gY3JlYXRlRmlyZWJhc2VBZG1pbkFwcChvcHRpb25zKVxuZXhwb3J0IGNvbnN0IGFkbWluQXV0aCA9IGdldEF1dGgoZmlyZWJhc2VBZG1pbilcbiJdLCJuYW1lcyI6WyJjZXJ0IiwiZ2V0QXBwIiwiZ2V0QXBwcyIsImluaXRpYWxpemVBcHAiLCJnZXRBdXRoIiwicHJpdmF0ZUtleSIsIkpTT04iLCJwYXJzZSIsInByb2Nlc3MiLCJlbnYiLCJQUklWQVRFX0tFWSIsImNyZWRlbnRpYWxzIiwicHJvamVjdElkIiwiUFJPSkVDVF9JRCIsImNsaWVudEVtYWlsIiwiQ0xJRU5UX0VNQUlMIiwib3B0aW9ucyIsImNyZWRlbnRpYWwiLCJkYXRhYmFzZVVSTCIsImNyZWF0ZUZpcmViYXNlQWRtaW5BcHAiLCJjb25maWciLCJsZW5ndGgiLCJmaXJlYmFzZUFkbWluIiwiYWRtaW5BdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/utils/firebaseAdminInit.ts\n");

/***/ }),

/***/ "(api)/./src/utils/prismaClientInit.ts":
/*!***************************************!*\
  !*** ./src/utils/prismaClientInit.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"prisma\": () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvcHJpc21hQ2xpZW50SW5pdC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFdEMsTUFBTUMsU0FBUyxJQUFJRCx3REFBWUEsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2tub3dsZWRnZS1zaGFyaW5nLWFwcC8uL3NyYy91dGlscy9wcmlzbWFDbGllbnRJbml0LnRzPzZiOWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/utils/prismaClientInit.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/db/courses/index.ts"));
module.exports = __webpack_exports__;

})();