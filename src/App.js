import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch, Redirect } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import UserPrivacyForm from "./pages/profiles/UserPrivacyForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import MilestonePage from "./pages/milestones/MilestonePage";
import MilestoneCreateForm from "./pages/milestones/MilestoneCreateForm";
import MilestoneEditForm from "./pages/milestones/MilestoneEditForm";
import MilestonesPage from "./pages/milestones/MilestonesPage";
import NotFound from "./components/NotFound";
import FollowRequestPage from "./pages/profiles/FollowRequestPage";
import DeleteProfilePage from "./pages/profiles/DeleteProfilePage";
import { Link } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

// Public Route Component
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser && restricted ? (
          <Redirect to="/posts" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Public Routes */}
          <PublicRoute exact path="/" restricted={true} component={SignInForm} />
          <PublicRoute exact path="/signup" restricted={true} component={SignUpForm} />

          {/* Protected Routes */}
          <ProtectedRoute
            exact
            path="/posts"
            component={() => (
              <PostsPage
                message="Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/milestones"
            component={() => (
              <MilestonesPage
                message="Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/liked/posts"
            component={() => (
              <PostsPage
                message="Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/liked/milestones"
            component={() => (
              <MilestonesPage
                message="Adjust the search keyword or like a milestone."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <ProtectedRoute exact path="/followrequests" component={FollowRequestPage} />
          <ProtectedRoute exact path="/posts/create" component={PostCreateForm} />
          <ProtectedRoute exact path="/posts/:id" component={PostPage} />
          <ProtectedRoute exact path="/posts/:id/edit" component={PostEditForm} />
          <ProtectedRoute exact path="/milestones" component={MilestonesPage} />
          <ProtectedRoute exact path="/milestones/create" component={MilestoneCreateForm} />
          <ProtectedRoute exact path="/milestones/:id" component={MilestonePage} />
          <ProtectedRoute exact path="/milestones/:id/edit" component={MilestoneEditForm} />
          <ProtectedRoute exact path="/profiles/:id" component={ProfilePage} />
          <ProtectedRoute exact path="/profiles/:id/edit/username" component={UsernameForm} />
          <ProtectedRoute exact path="/profiles/:id/edit/password" component={UserPasswordForm} />
          <ProtectedRoute exact path="/profiles/:id/edit/privacy" component={UserPrivacyForm} />
          <ProtectedRoute exact path="/profiles/:id/edit" component={ProfileEditForm} />
          <ProtectedRoute exact path="/profiles/:id/edit/deleteprofile" component={DeleteProfilePage} />

          {/* Not Found Route */}
          <Route
            render={() => (
              <NotFound
                message={
                  <p>
                    Please <Link to="/">Sign In</Link> or <Link to="/signup">Sign Up</Link> to view this page.
                  </p>
                }
              />
            )}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
