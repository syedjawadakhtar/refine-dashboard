import {
  AuthBindings,
  Authenticated,
  LegacyAuthProvider,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

// import { authProvider } from "./authProvider";

import {
  AccountCircleOutlined,
  BubbleChartOutlined,
  BubbleChartRounded,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
  DashboardOutlined
} from '@mui/icons-material';

import DashboardPage from "./pages/dashboard";
import { ThemedHeaderV2 } from "components/layout/header";
import { ThemedSiderV2 } from "components/layout/sider";
import { ThemedTitleV2 } from "components/layout/title";
import React from 'react';

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import {
  Login,
  Home,
  Director,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  DirectorProfile,
  EditProperty,
} from "pages";

// import { CreateProperty, PropertyDetails, EditProperty, AllProperties } from "pages/properties"

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { AuthProvider, CheckResponse } from "@refinedev/core/dist/interfaces";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (config.headers) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

function App() {
  console.log(localStorage.setItem("user", JSON.stringify({})));
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      
      // Save user to MongoDB
      if (profileObj) {
        const response = await fetch('http://localhost:8080/api/v1/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          })
        })
        const data = await response.json();
        
        if (response.status === 200){
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id
            })
          );
        } else {
          return Promise.reject();
        }

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
        if (typeof window !== 'undefined' && window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.revoke(token, () => {
            return {};
          });
        }
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const profileObj = parseJwt(token);
        const allowedEmails = ["syedjawadakhtar@gmail.com"];
        if (profileObj && allowedEmails.includes(profileObj.email)) {
          return {
            authenticated: true,
          };
        } else {
          return {
            authenticated: false,
            error: {
              message: "Unauthorized access",
              name: "Unauthorized",
            },
            logout: true,
            redirectTo: "/login",
          };
        }
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://localhost:8080/api/v1")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                // DashboardPage={Home}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                      icon: <DashboardOutlined />,
                    },
                  },
                  {
                    name: "properties",
                    list: "/properties",
                    show: "/PropertyDetails",
                    create: "/CreateProperty",
                    edit: "/EditProperty",
                    icon: <VillaOutlined />
                  },
                  {
                    name: "directors",
                    list: "/Directors",
                    show: "/DirectorProfile",
                    icon: <PeopleAltOutlined />
                  },
                  {
                    name: "reviews",
                    list: "/reviews",
                    icon: <StarOutlineRounded />
                  },
                  {
                    name: "messages",
                    list: "/messages",
                    icon: <BubbleChartOutlined />
                  },
                  {
                    name: "my-profile",
                    options: { label: 'My Profile' },
                    list: MyProfile,
                    icon: <AccountCircleOutlined />
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "jNddc4-Kj0rwe-eCpyoa",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={ThemedHeaderV2} Sider={ThemedSiderV2} Title={ThemedTitleV2}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route index element={<DashboardPage />} />
                    <Route path="/reviews" element={<DashboardPage />} />
                    <Route path="/messages" element={<DashboardPage />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/properties">
                      <Route index element={<AllProperties />} />
                      <Route
                        path="show"
                        element={<PropertyDetails />}
                      />
                      <Route
                        path="create"
                        element={<CreateProperty />}
                      />
                      <Route
                        path="edit"
                        element={<EditProperty />}
                      />
                    </Route>
                    <Route path="/directors">
                      <Route index element={<Director />} />
                      <Route
                        path="show"
                        element={<DirectorProfile />}
                      />
                    </Route>
                    {/* <Route
                      index
                      element={<NavigateToResource resource="properties" />}
                    /> */}
                    {/* <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    /> */}
                    <Route index element={<AllProperties />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route path="/" element={<Home />} />
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
