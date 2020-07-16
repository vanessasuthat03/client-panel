import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper"
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect"
import LoadingScreen from "../components/layout/Spinner"

const locationHelper = locationHelperBuilder({})

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/login",
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsNotAuthenticated",
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/",
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty
})

// import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper"
// import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect"
// import connectedAuthWrapper from "redux-auth-wrapper/connectedAuthWrapper"

// import Loading from "./components/Loading"

// const locationHelper = locationHelperBuilder({})

// const userIsAuthenticatedDefaults = {
//   authenticatedSelector: state => state.user.data !== null,
//   authenticatingSelector: state => state.user.isLoading,
//   wrapperDisplayName: "UserIsAuthenticated"
// }

// export const userIsAuthenticated = connectedAuthWrapper(
//   userIsAuthenticatedDefaults
// )

// export const userIsAuthenticatedRedir = connectedRouterRedirect({
//   ...userIsAuthenticatedDefaults,
//   AuthenticatingComponent: Loading,
//   redirectPath: "/login"
// })

// export const userIsAdminRedir = connectedRouterRedirect({
//   redirectPath: "/",
//   allowRedirectBack: false,
//   authenticatedSelector: state =>
//     state.user.data !== null && state.user.data.isAdmin,
//   predicate: user => user.isAdmin,
//   wrapperDisplayName: "UserIsAdmin"
// })

// const userIsNotAuthenticatedDefaults = {
//   // Want to redirect the user when they are done loading and authenticated
//   authenticatedSelector: state =>
//     state.user.data === null && state.user.isLoading === false,
//   wrapperDisplayName: "UserIsNotAuthenticated"
// }

// export const userIsNotAuthenticated = connectedAuthWrapper(
//   userIsNotAuthenticatedDefaults
// )

// export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
//   ...userIsNotAuthenticatedDefaults,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/protected",
//   allowRedirectBack: false
// })
