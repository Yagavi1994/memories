# Memories


![Overview](readme/features/responsive-image.png)


Link to the website: [Memories](https://memories-frontend-895c7e867e2e.herokuapp.com)


# Project Overview

"Memories" aims at providing trustworthy, well-researched, and easy-to-understand information for parents, covering topics from newborn care to toddler years. As a first-time mom, I faced numerous hurdles—whether it was navigating the complexities of breastfeeding, figuring out formula feeding, or understanding the nuances of baby sleep patterns. Each stage brought its own set of challenges, and like many new parents, I often turned to the internet for guidance. However, I quickly realized that the vast sea of information out there could be overwhelming. With so many sources providing differing advice, I often found myself more confused than reassured.

This experience sparked an idea. I began to wish for a single, reliable source where I could find all the information I needed—whether it was about a newborn’s sleep schedule, a toddler’s growth milestones, or even how to handle the teenage years. I envisioned a space where parents like me could find trustworthy, well-researched, and easy-to-understand information all in one place. That dream led to the creation of this blog.


# Table of Content 

- [Project Overview](#project-overview)
- [Project objectives](#project-objectives)
- [User Experience](#user-experience) 
- [Design](#design)  
- [Agile Methodology](#agile-methodology)
- [Database Scheme & User Journey](#database-scheme-&-user-journey)
- [Wireframes](#wireframes)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Deployment & local development](#deployment-&-local-development)
- [Credits](#credits)
- [Acknowledgement](#acknowledgement)


# Project objectives

## User Goals


* Find reliable, well-researched, and easy-to-understand parenting information.
* Connect with other parents who are experiencing similar challenges.
* Gain guidance on various stages of child development, from newborns to toddlers.
* Read practical tips and advice on topics like feeding, sleep, and behavior management.
* Access expert insights on parenting challenges and solutions. 

---

## Site Owner Goals


* Build a trusted community of parents seeking reliable information and support.
* Offer a platform for parents to share their experiences and knowledge with others.
* Encourage users to regularly engage with content through comments and saving their favorite posts in their profile.
* Provide a seamless and user-friendly experience across all devices, making it easy to find and navigate content.
* Encourage visitors to register and subscribe for additional features (future premium membership options).

---

# User Experience


## User Stories


### Target user


* People who wants to prepare themselve before planning for a child
* People who are pregnant and going to have a baby soon
* People who are parents of children from newborn to toddlers

---

### First Time Visitor Goals

Here are all the user stories with their respective acceptance criteria in the structured format:

Navigation & Authentication
Navigation: Navbar
* User Story 1: As a user, I can view a navbar from every page so that I can navigate easily between pages.
* Acceptance Criteria:
    1. Navbar is visible on every page.
    2. Navbar includes links to all main pages (e.g., Home, Profile, Posts, Sign In, Sign Up).
    3. Navbar updates to show relevant options based on the logged-in status (e.g., "Sign In" and "Sign Up" for logged-out users; "Profile" and "Logout" for logged-in users).
    4. Navbar is responsive and adapts to various screen sizes.
Routing: Seamless Navigation
* User Story 2: As a user, I can navigate through pages quickly so that I can view content seamlessly without page refresh.
* Acceptance Criteria:
    1. Users can navigate between pages without a full page reload (via client-side routing).
    2. Page transitions are smooth and quick, without any noticeable delays.
    3. Browser history is correctly updated to support back and forward navigation.
Authentication - Sign Up
* User Story 3: As a user, I can create a new account so that I can access all the features for signed-up users.
* Acceptance Criteria:
    1. Users can access a sign-up form.
    2. Form validation ensures required fields are filled with appropriate formats (e.g., valid email).
    3. Error messages are shown for invalid input (e.g., duplicate email, weak password).
    4. Successful sign-up redirects users to a welcome or home page.
    5. Confirmation message is displayed upon successful account creation.
Authentication - Sign In
* User Story 4: As a user, I can sign in to the app so that I can access functionality for logged-in users.
* Acceptance Criteria:
    1. Users can access a sign-in form.
    2. Form validation checks for required fields and provides error messages for invalid input.
    3. Users with valid credentials are redirected to the home or designated page.
    4. Error messages are displayed for incorrect credentials.
Authentication - Logged-in Status
* User Story 5: As a user, I can tell if I am logged in or not so that I can log in if I need to.
* Acceptance Criteria:
    1. Logged-in status is visually indicated on all pages (e.g., with user avatar or "Logout" option).
    2. Logged-out status displays "Sign In" and "Sign Up" options instead.
    3. Users can easily distinguish between logged-in and logged-out states.
Authentication - Refreshing Access Tokens
* User Story 6: As a user, I can maintain my logged-in status until I choose to log out so that my user experience is not compromised.
* Acceptance Criteria:
    1. Tokens automatically refresh before they expire, maintaining the user’s session.
    2. Users do not experience interruptions during normal use.
    3. Expired sessions redirect users to the login page with an appropriate message.
    4. Security measures ensure that tokens are only refreshed for authenticated sessions.
Navigation - Conditional Rendering
* User Story 7: As a logged-out user, I can see sign-in and sign-up options so that I can sign in/sign up.
* Acceptance Criteria:
    1. Logged-out users see only "Sign In" and "Sign Up" options.
    2. Logged-in users see user-specific options (e.g., "Profile," "Logout").
    3. Navbar options dynamically update based on authentication status.
Avatar
* User Story 8: As a user, I can view user avatars so that I can easily identify users of the application.
* Acceptance Criteria:
    1. User avatars are displayed wherever applicable (e.g., navbar, comments, posts).
    2. Default avatar is shown if a user has not set a custom avatar.
    3. User avatars are updated across the app if changed.

Adding & Liking Posts
Create Posts
* User Story 9: As a logged-in user, I can create posts so that I can share my images with the world.
* Acceptance Criteria:
    1. Only logged-in users can access the "Create Post" page.
    2. Users can add images and captions to their posts.
    3. Validation ensures all required fields are completed before submission.
    4. Upon successful post creation, users are redirected to the post or main feed.
    5. Users receive feedback or confirmation after successfully posting.
View a Post
* User Story 10: As a user, I can view the details of a single post so that I can learn more about it.
* Acceptance Criteria:
    1. Users can view details of a single post, including image, caption, likes, and comments.
    2. Post information is displayed in a clear and organized manner.
    3. Users can navigate back to the main feed easily.
Like a Post
* User Story 11: As a logged-in user, I can like a post so that I can show my support for the posts that interest me.
* Acceptance Criteria:
    1. Only logged-in users can like posts.
    2. Users can toggle likes on and off.
    3. Liked posts visually indicate the "liked" status.
    4. Like count updates in real-time without requiring a page refresh.

The Posts Page
View Most Recent Posts
* User Story 12: As a user, I can view all the most recent posts, ordered by most recently created first so that I am up to date with the newest content.
* Acceptance Criteria:
    1. Posts are displayed in order of most recent first.
    2. Users can scroll through a list of posts from the main feed.
    3. Each post displays key information (e.g., image, caption, like count).
Search for Posts
* User Story 13: As a user, I can search for posts with keywords so that I can find the posts and user profiles I am most interested in.
* Acceptance Criteria:
    1. A search bar is accessible on the posts page.
    2. Users can enter keywords to find relevant posts or profiles.
    3. Search results display in real-time or after submission.
    4. Users can clear the search to view the main feed again.
View Liked Posts
* User Story 14: As a logged-in user, I can view the posts I liked so that I can find the posts I enjoy the most.
* Acceptance Criteria:
    1. Logged-in users can access a list of posts they’ve liked.
    2. Liked posts display in order of most recently liked.
    3. Users can navigate to each liked post directly from the list.
View Posts of Followed Users
* User Story 15: As a logged-in user, I can view content filtered by users I follow so that I can keep up to date with what they are posting about.
* Acceptance Criteria:
    1. Logged-in users can view posts filtered by the users they follow.
    2. Posts are displayed in reverse chronological order.
    3. Users can toggle between “All Posts” and “Followed Users” views.
Infinite Scroll
* User Story 16: As a user, I can keep scrolling through the images on the site, that are loaded for me automatically so that I don't have to click on "next page" etc.
* Acceptance Criteria:
    1. Posts are loaded automatically as users scroll down the page.
    2. Users can continue scrolling without clicking “Next Page” or similar navigation.
    3. Loading indicators are displayed when more content is being fetched.

The Post Page
View Post Page
* User Story 17: As a user, I can view the post page so that I can read the comments about the post.
* Acceptance Criteria:
    1. Users can view a post page with all details, including comments and likes.
    2. Users can easily navigate back to the main feed.
Edit Post
* User Story 18: As a post owner, I can edit my post title and description so that I can make corrections or update my post after it was created.
* Acceptance Criteria:
    1. Only the post owner can access the "Edit Post" option.
    2. Post owners can modify the title and description of their posts.
    3. Updated post information is saved and displayed upon submission.
Create a Comment
* User Story 19: As a logged-in user, I can add comments to a post so that I can share my thoughts about the post.
* Acceptance Criteria:
    1. Logged-in users can add comments to a post.
    2. Form validation checks for required fields.
    3. Comments appear immediately after submission.
Comment Date
* User Story 20: As a user, I can see how long ago a comment was made so that I know how old a comment is.
* Acceptance Criteria:
    1. Each comment displays a relative timestamp (e.g., “2 hours ago”).
    2. Timestamps update dynamically to reflect time since posted.
View Comments
* User Story 21: As a user, I can read comments on posts so that I can read what other users think about the posts.
* Acceptance Criteria:
    1. Users can read all comments
under a post in chronological order. 2. Comments section is easily accessible and visible on the post page.
Delete Comment
* User Story 22: As an owner of a comment, I can delete my comment so that I can control removal of my comment from the application.
* Acceptance Criteria:
    1. Only comment owners can see the "Delete" option.
    2. Confirmation prompt appears before a comment is deleted.
    3. Deleted comments are removed instantly from the page.
Edit Comment
* User Story 23: As an owner of a comment, I can edit my comment so that I can fix or update my existing comment.
* Acceptance Criteria:
    1. Only comment owners can see the "Edit" option.
    2. Comment owners can modify their comments.
    3. Updated comment appears immediately after submission.

The Profile Page
Profile Page
* User Story 24: As a user, I can view other users’ profiles so that I can see their posts and learn more about them.
* Acceptance Criteria:
    1. Users can view other users’ profiles, including posts and bio.
    2. Profiles display user information, post count, and other relevant details.
Most Followed Profiles
* User Story 25: As a user, I can see a list of the most followed profiles so that I can see which profiles are popular.
* Acceptance Criteria:
    1. Users can see a list of the most followed profiles on the app.
    2. List displays in descending order based on the number of followers.
User Profile - User Stats
* User Story 26: As a user, I can view statistics about a specific user: bio, number of posts, follows, and users followed so that I can learn more about them.
* Acceptance Criteria:
    1. Profile pages display user statistics (e.g., bio, number of posts, followers, following).
    2. Stats are updated in real-time when changes occur.
Follow/Unfollow a User
* User Story 27: As a logged-in user, I can follow and unfollow other users so that I can see and remove posts by specific users in my posts feed.
* Acceptance Criteria:
    1. Logged-in users can follow or unfollow other users.
    2. Followed users’ posts appear in the follower’s feed.
    3. Follower and following counts update immediately after action.
View All Posts by a Specific User
* User Story 28: As a user, I can view all the posts by a specific user so that I can catch up on their latest posts, or decide I want to follow them.
* Acceptance Criteria:
    1. Users can view a list of all posts by a specific user on their profile.
    2. Posts display in reverse chronological order.
Edit Profile
* User Story 29: As a logged-in user, I can edit my profile so that I can change my profile picture and bio.
* Acceptance Criteria:
    1. Only the profile owner can edit their profile.
    2. Users can change their profile picture and bio.
    3. Profile updates are saved and displayed immediately.
Update Username and Password
* User Story 30: As a logged-in user, I can update my username and password so that I can change my display name and keep my profile secure.
* Acceptance Criteria:
    1. Logged-in users can access a form to update their username and password.
    2. Form validation ensures the new username is unique and the password is secure.
    3. Users receive a confirmation message upon successful update.
    4. User session is maintained, or the user is prompted to re-authenticate if necessary.
Profile privacy
User Story 31: As a user, I can set my profile to public or private so that I have control over who can view my posts and information.
Acceptance Criteria:
1. Users can access a setting on their profile page to toggle between "Public" and "Private" profile modes.
2. When set to "Public," any user (logged in or logged out) can view the profile and its posts.
3. When set to "Private," only approved followers can view the profile and its posts; non-followers see a message indicating the profile is private.
4. A notification or confirmation message appears to confirm the change in profile visibility.
5. The setting change is saved immediately and persists across sessions.
6. Followers receive a notification if a profile they follow becomes private (optional).
7. If a private profile user unfollows someone, that user loses access to their profile and posts.
Delete Profile
User Story 32: As a logged-in user, I can delete my profile and user account.
Acceptance Criteria:
1. Only the profile owner can delete their profile and user account.
2. A confirmation message should be displayed asking the user to confirm deletion or cancel it, before deleting their profile and user account.
Milestones
User Story 33:As a user, similar to posts, I can add milestones for my baby (e.g., first steps, first words) to their profile so that I can keep a record of important developmental moments. These milestones will be displayed on a separate "Milestones" page for easy viewing.
Acceptance Criteria:
1. Users can access a "Milestones" section from their profile to add, edit, and delete milestones.
2. Milestone entries allow for fields such as milestone title (e.g., "First Steps"), date, and an optional description.
3. Each milestone can include a photo or video to capture the moment.
4. Milestones are displayed in chronological order on a dedicated "Milestones" page, separate from the "Posts" page.
5. The "Milestones" page is accessible from the user’s profile, and visibility depends on the profile’s public/private setting.
6. Users receive feedback upon successfully adding, editing, or deleting a milestone.
7. Milestones are saved immediately and persist across sessions, viewable on the user’s profile.
Admin Features
User Story 34:As an admin, I can access an admin dashboard from which I can manage all user-generated content and user-related data, so that I can maintain the platform's quality and ensure proper moderation.
Acceptance Criteria:
* Access & Navigation:
    * Admin dashboard is accessible only to users with admin privileges.
    * Admin dashboard includes navigation links to manage:
        * Profiles
        * Users
        * Posts
        * Milestones
        * Comments
        * Likes
        * Followers
        * Follow Requests
    * Admin can easily navigate between management sections using a sidebar or top navigation bar.
* CRUD Functionality:
    * Admin can view, create, edit, and delete:
        * User profiles
        * Posts
        * Milestones
        * Comments
        * Likes
    * Admin can view, add and remove followers and follow requests if necessary.
* Data Visibility:
    * Admin can view a list of all users with key information (e.g., username, email, role, account status).
* User Management:
    * Admin can:
        * View all activity related to a specific user (posts, milestones, comments, likes, followers).

---

### Future Goals

- **Social Login Integration**: In the future, plan to implement Google and Facebook login options, allowing users to sign up and log in with their existing social media credentials, making the process quicker and more convenient.
  
- **Content Sharing Features**: Aim to add social sharing functionality, enabling parents to easily share blog posts, tips, and resources with their friends and family on various platforms like Facebook, Twitter, and WhatsApp.
  
- **Community Forum**: A future goal is to introduce a community forum where parents can interact, ask questions, and share their experiences with one another, creating a supportive space for learning and exchange.

- **Newsletter Subscription**: Plan to implement a newsletter subscription option, allowing users to receive curated content, parenting tips, and updates about new blog posts directly in their inbox.

- **Mobile App Development**: As the blog continues to grow, would like to create a mobile app for iOS and Android, giving parents access to the platform on the go with a more streamlined and optimized experience.

- **Premium Membership**: In the long-term, envision introducing premium membership options that would offer exclusive content, personalized advice, and special resources for subscribers.

- **Advanced Search and Filtering**: Another future enhancement will be improving the search and filtering capabilities of the blog, allowing users to easily find content tailored to their child’s age, stage, or specific challenges.

These goals aim to continually improve the user experience, build a stronger community, and provide parents with more value as they navigate the challenges of raising children.

---

# Design

## Design Choices

The design of Cradle Blog was crafted to be vibrant and playful, reflecting the theme of parenting and children. Since the blog caters to parents, many of whom are often overwhelmed with the responsibilities of raising a child, the design aims to inject a sense of fun and energy into their browsing experience. The goal was to create a space that feels lighthearted and colorful, offering parents a refreshing and engaging atmosphere.

## Color Scheme

The color palette for Cradle Blog was inspired by my twin girls' favorite colors—pink and purple. These personal elements were integrated into the blog to honor the role my daughters played in inspiring its creation. The main colors used are **pink**, **purple**, **yellow**, and **dark grey**:
- **Pink and purple** are the core colors throughout the blog, representing joy and connection.
- **Yellow** serves as the background for the pages, inspired by the bright banner image that features yellow. It brings a cheerful and lively tone to the website.
- **Dark grey** was chosen for the header and footer to provide a strong contrast with the lighter, more playful colors, ensuring readability and structure.
- **Dark pink** is used for accents such as underlines and borders, offering a cohesive and stylish contrast against the rest of the color scheme.

![Color Scheme](static/images/readme/colors-and-font/colours.png)

## Typography

The blog utilizes a mix of fonts from Google Fonts to enhance readability and emphasize key areas of the website. The selected fonts bring a balance of fun and clarity to the blog's aesthetic:
- **Salsa** is used for headings, giving a playful and distinct appearance to titles and headers.
- **Handlee** is applied to blog excerpts, adding a personal and handwritten feel that complements the blog’s warm tone.
- **Nunito Sans** is used for the rest of the content, including buttons, links, and forms, offering a clean and modern look that ensures legibility across all devices.

### Salsa
![Font Salsa](static/images/readme/colors-and-font/salsa.png)

### Handlee
![Font Handlee](static/images/readme/colors-and-font/handlee.png)

### Nunito
![Font Nunito](static/images/readme/colors-and-font/nunito.png)

## Imagery

The imagery for Cradle Blog is designed to evoke warmth and personalization. The home page banner features a background image sourced from Freepik, with a personal touch—a picture of my twin girls placed on top of the background. Their presence on the site reminds me of the inspiration behind this blog. Other images used in the blog posts and avatars were generated using ChatGPT, providing a cohesive visual experience throughout the site.

## Logo

The logo was designed with my twin daughters in mind. Since their picture is featured in the banner, I wanted to continue that theme with the logo. It features two baby girls sleeping inside a cradle, symbolizing the core inspiration for the blog. The logo is not only a representation of Cradle Blog’s mission but also a personal homage to the journey of parenthood that led to its creation.

![Logo](static/images/readme/features/logo.png)

# Agile Methodology

Agile methodology is a flexible and iterative approach to software development that emphasizes collaboration, adaptability, and customer feedback. It allows teams to respond to changing requirements and deliver valuable features incrementally. In this project, we follow Agile principles to enhance productivity and ensure successful project delivery.

- **User Stories and Github Issues**: I utilized Github issues to create detailed user stories for my project. Each user story included essential components such as story points and acceptance criteria.These user stories were tracked either on the Kanban board or within the issues themselves.
- **Kanban Board for Prioritization**: The Github Kanban board played a crucial role in managing my project. User stories were assigned to specific issues, allowing me to define clear goals and priorities.

#### Project Sections: My project was organized into the following sections:

- To-do: User stories awaiting implementation.
- In-progress: Ongoing work.
- Done: Completed tasks.

To review the Kanban board for the project, please click [HERE](https://github.com/users/Yagavi1994/projects/3)


# Database Scheme & User Journey

## User Journey

![User journey flowchart](static/images/readme/data-scheme-and-flow-chart/flowchart.webp)

## Database Scheme 

- Post has many Comments and Favourites, is linked to one Category, and is authored by one User.
- Category can have many Posts.
- Comment is linked to one Post and one User.
- Profile is linked to one User.
- Favourite links a User to a Post.

This entity-relationship diagram shows a well-structured design for a blog platform, allowing for efficient management of posts, comments, user profiles, and favorites, while ensuring smooth interaction between these entities.

![Database Scheme](static/images/readme/data-scheme-and-flow-chart/data-relationship-entity-diagram.png)


# Wireframes
<details>
<summary>Register</summary>
<br>

### Mobile
![Register](static/images/readme/wireframes/sign-up-mobile.png)
### Tablet
![Register](static/images/readme/wireframes/sign-up-tablet.png)
### Laptop
![Register](static/images/readme/wireframes/sign-up-laptop.png)
</details>

<details>
<summary>Log In </summary>
<br>

### Mobile
![Log in](static/images/readme/wireframes/sign-in-mobile.png)
### Tablet
![Log in](static/images/readme/wireframes/sign-in-tablet.png)
### Laptop
![Log in](static/images/readme/wireframes/sign-in-laptop.png)

</details>

<details>
<summary>Home</summary>
<br>

### Mobile
![Home](static/images/readme/wireframes/landing-page-mobile.png)
### Tablet
![Home](static/images/readme/wireframes/landing-page-tablet.png)
### Laptop
![Home](static/images/readme/wireframes/landing-page-laptop.png)
</details>

<details>
<summary>Blog Post</summary>
<br>

### Mobile
![Blog Post](static/images/readme/wireframes/blog-post-mobile.png)
### Tablet
![Blog Post](static/images/readme/wireframes/blog-post-tablet.png)
### Laptop
![Blog Post](static/images/readme/wireframes/blog-post-laptop.png)
</details>

<details>
<summary>Search Page/ Category Page</summary>
<br>

### Mobile
![Search Page](static/images/readme/wireframes/search-page-mobile.png)
### Tablet
![Search Page](static/images/readme/wireframes/search-page-tablet.png)
### Laptop
![Search Page](static/images/readme/wireframes/search-laptop.png)
</details>

<details>
<summary>Profile Page</summary>
<br>

### Mobile
![Profile Page](static/images/readme/wireframes/profile-page-mobile.png)
### Tablet
![Profile Page](static/images/readme/wireframes/profile-page-tablet.png)
### Laptop
![Profile Page](static/images/readme/wireframes/profile-page-laptop.png)
</details>

<details>
<summary>Favourites</summary>
<br>

### Mobile
![Favourites](static/images/readme/wireframes/favourites-mobile.png)
### Tablet
![Favourites](static/images/readme/wireframes/favourites-tablet.png)
### Laptop
![Favourites](static/images/readme/wireframes/favourites-laptop.png)
</details>

<details>
<summary>Comments</summary>
<br>

### Mobile
![Comments](static/images/readme/wireframes/comments-mobile.png)
### Tablet
![Comments](static/images/readme/wireframes/comments-tablet.png)
### Laptop
![Comments](static/images/readme/wireframes/comments-laptop.png)
</details>

<details>
<summary>400 Error</summary>
<br>

### Mobile
![400 Error](static/images/readme/wireframes/404-mobile.png)
### Tablet
![400 Error](static/images/readme/wireframes/404-tablet.png)
### Laptop
![400 Error](static/images/readme/wireframes/404-laptop.png)
</details>

<details>
<summary>Log Out</summary>
<br>

### Mobile
![Log out](static/images/readme/wireframes/sign-out-mobile.png)
### Tablet
![Log out](static/images/readme/wireframes/sign-out-tablet.png)
### Laptop
![Log out](static/images/readme/wireframes/sign-out-laptop.png)
</details>


# Features

Here is the detailed content for the features you requested, with relevant **User Stories** quoted under each feature, formatted for a `README.md` file:

---

## Features

### Home Page
The homepage has a banner on top with a welcome message and displays the latest blog posts in a clean and user-friendly format. Each post shows the title, a short excerpt, the author's name and the published date. Posts are ordered by the most recent first, providing users with fresh content at the top.

- **User Story 1**: The homepage should display a list of the latest blog posts with links to view the full content.

![Home Page](static/images/readme/features/home-page.png)

---

### About Page
The "About" page has a picture of the site owner and introduces the purpose and mission of the blog. It provides information on what the blog aims to achieve and the values behind it. This page is accessible from the main navigation bar.

- **User Story 8**: The "About" page should be well-organized, easy to read, and offer details about the blog's goals.

![About Page](static/images/readme/features/about-page.png)

---

### Contact Page
The contact page allows visitors to reach out to the blog administrators for inquiries or support. It includes a contact form with fields for the user's name, email address, and message. Upon submission, users receive a confirmation message.

- **User Story 9**: Visitors should be able to submit inquiries through the contact page, and receive confirmation after submission.

![Contact Page](static/images/readme/features/contact-page.png)

---

### Blog Post Page
Each blog post has its own dedicated page, displaying the title, full content, source, and published date. Users can easily navigate between posts using "Next" and "Previous" buttons. The post page also includes options for sharing the content on social media.

- **User Story 2**: Blog posts should have dedicated pages with easy navigation options.

![Blog Post Page](static/images/readme/features/blog-post-page.png)

---

### Navigation Between Posts
The blog allows users to easily navigate between posts using "Next" and "Previous" buttons. These buttons are located at the bottom of each blog post, enabling visitors to move chronologically between posts without returning to the homepage or a category page. This seamless navigation enhances the user experience by allowing users to explore more content in a convenient manner.

- **User Story 3**: As a visitor, I want to navigate between posts using "Next" and "Previous" buttons so that I can explore more content.

![Pagination](static/images/readme/features/post-navigation.png)

---

### Add and Remove Favourites
Users can favourite blog posts for later reference. Each post has a "Like" or "Favourite" button that adds or removes the post from the user's favourites list. A success message appears after each action.

- **User Story 24**: Users should be able to like/favourite posts and see them listed in their profile's favourites section.

#### Add Favourites
![Add and Remove Favourites](static/images/readme/features/add-favourites.png)

#### Remove Favourites
![Add and Remove Favourites](static/images/readme/features/remove-favourites.png)

---

### Add, Update and Delete Comments
Registered users can leave comments on blog posts, update their existing comments, or delete them. Each comment is displayed with the user's name, avatar, and the time it was posted. Comments can be edited or removed at any time.

- **User Story 23**: Users should be able to add, update, and delete their comments on blog posts.

![Comments](static/images/readme/features/comments.png)

---

### Filter Content by Category

The blog provides a feature that allows users to filter posts based on categories. This enables visitors to browse content specific to their interests, such as newborn care, toddler tips or feeding advice. The categories are accessible via a dropdown in the navigation bar, providing an easy way for users to discover posts related to particular topics.

- **User Story 4**: As a visitor, I want to filter blog posts by category so that I can browse specific topics relevant to my interests.

![Category](static/images/readme/features/categories.png)

---

### Pagination for Blog Posts
The blog implements pagination for blog post listings when there are more than 5 posts on a single page. Pagination helps break up the content into smaller chunks, allowing for quicker loading times and a better user experience. The pagination controls are displayed at the bottom of the blog posts list, allowing users to navigate between pages of content easily.

- **User Story 10**: As a visitor, I want to navigate between multiple pages of blog posts when there are more than 5 posts per page so that I can easily browse through the content.

![Pagination](static/images/readme/features/pagination.png)


### Profile Page
Users have a dedicated profile page where they can view their personal information, including their avatar, name, email address, and a list of their favourite posts and comment history. The page also provides options to edit their details.

- **User Story 25**: Users should be able to view their profile and access their favourites and comments.

![Profile Page](static/images/readme/features/profile-page.png)
  
---

### Edit and Delete Picture Page
Users can update or delete their profile picture through the "Edit Picture" page. They can upload a new image from their system or choose from pre-defined avatars. If the picture is deleted, a default avatar will be applied.

- **User Story 26**: Users should be able to edit or delete their profile picture, with changes reflected in their profile.

#### Edit Picture
![Edit Picture Page](static/images/readme/features/edit-picture.png)

#### Delete Picture
![Delete Picture Page](static/images/readme/features/delete-picture.png)

---

### Favourites Page
The favourites page lists all posts the user has liked or favourited. Each post shows the title and excerpt. Users can quickly access posts they’ve saved.

- **User Story 27**: Users should have access to a list of their favourite posts via their profile page.

![Favourites Page](static/images/readme/features/favourites-page.png)

---

### Comments Page
The comments page provides a history of all the comments made by the user. It shows each comment, the date it was posted, and the blog post it was made on. Each comment is linked to the original comment in the blog post for easy navigation and when clicked it takes the user to that particular comment highlighting it.

- **User Story 28**: Users should be able to see their comment history in their profile.

![Comments Page](static/images/readme/features/comments-page.png)

---

### Delete Account
Users have the option to permanently delete their account. This action removes all user data, including posts, favourites, and comments. Users must confirm account deletion, and once deleted, they are logged out and redirected to the homepage.

- **User Story 29**: Users should be able to delete their account, which will permanently remove their data.

![Delete Account](static/images/readme/features/delete-account.png)

---

### Header
The header has a logo and  includes a navigation bar that allows users to access important sections of the blog, such as Home, About, Contact, Categories, Login, Register, Profile and Logout. It is present on every page and highlights the current page for easy navigation.

- **User Story 5**: The navigation bar should be present at the top of every page and include links to key sections of the site.

![Header](static/images/readme/features/header.png)

---

### Footer
The footer includes copyright information, social media links, and a "Back to Top" button for quick navigation. Social media links open the respective platforms in new tabs.

- **User Story 7**: The footer should provide copyright details, social media links, and a functional "Back to Top" button.

![Footer](static/images/readme/features/footer.png)

---

### Restricted Features Notification

Certain features of the blog, such as commenting on posts and adding posts to favourites, are reserved for registered users. When a visitor attempts to access these features without being logged in, the system displays a prompt informing them that they need to either log in or sign up to proceed. This ensures that user-specific actions are secured and associated with the correct user account.

The notification provides a clear and friendly message, with links to the login and registration pages. Until the visitor logs in or registers, they are prevented from using these restricted features.

- **User Story 13**: When attempting to use restricted features (e.g., commenting, favouriting), the system should notify the user to log in or sign up, and prevent access to these features until they are registered.

![Restricted Feature](static/images/readme/features/restricted-notifications.png)

---

### Sign Up
Visitors can create an account through the registration form, which includes fields for email, username, and password. Validation ensures that all fields are properly formatted, and users must meet specific password requirements.

- **User Story 14**: Visitors should be able to sign up for an account, providing valid credentials to register.

![Sign Up](static/images/readme/features/signup-page.png)

---

### Email Verification
Upon successful registration, users receive an email verification link. The user must confirm their email before accessing certain features. The verification email contains a link that confirms the account when clicked.

- **User Story 20**: Users should receive an email verification link after registration, which they must confirm to activate their account.

![Email Verification](static/images/readme/features/email-verification.png)

---

### Log In
Registered users can log in using their email/username and password. After successful login, they are redirected to their profile or homepage.

- **User Story 15**: Users should be able to log in using their credentials and access their profile and blog features.

![Log in](static/images/readme/features/login-page.png)

---

### Log Out
Users can securely log out of their accounts. Upon logging out, they are redirected to the homepage, and a confirmation message is displayed.

- **User Story 16**: Users should be able to log out from their account and secure their session.

![Log out](static/images/readme/features/log-out-page.png)

---

### Forgot Password
If a user forgets their password, they can request a password reset link through the "Forgot Password" link on the login page. An email is sent with instructions to reset their password.

- **User Story 21**: Users should be able to request a password reset link via email.

![Forgot Password](static/images/readme/features/forgot-password.png)

---

### Reset Password
Upon receiving the reset email, users can click the link to access a secure page where they can set a new password. The new password must meet security requirements before the user can log in.

- **User Story 22**: Users should be able to reset their password via the link sent in their email.

![Reset Password](static/images/readme/features/reset-password.png)

---

### Responsiveness
The blog is fully responsive and works seamlessly across all devices, including desktops, tablets, and mobile phones. The layout, images, and interactive elements automatically adjust to fit the screen size, providing a consistent experience.

- **User Story 11**: The blog should be responsive across all devices, ensuring smooth navigation and readability.

![Responsiveness](static/images/readme/features/responsive-design.png)

---

### Displaying Messages for Successful and Unsuccessful Requests
The system displays confirmation messages for actions such as logging in, logging out, commenting, favouriting posts, and more. Similarly, error messages are shown for unsuccessful requests (e.g., login failures, form validation errors).

- **User Story 24, 26, 21, 16**: The system should show success messages after completing actions like favouriting posts, editing profiles, resetting passwords, and logging out.

![Success message](static/images/readme/features/success-msg-1.png)
![Success message](static/images/readme/features/success-msg-2.png)
![Success message](static/images/readme/features/success-msg-3.png)
![Success message](static/images/readme/features/success-msg-4.png)
![Success message](static/images/readme/features/success-msg-5.png)

---

### User Experience
The design of the blog focuses on ease of use and enhancing the user experience. The site incorporates smooth animations, vibrant colors, and an intuitive interface to keep users engaged. Key actions such as commenting, browsing posts, and navigating through the blog are designed to be seamless and efficient.

- **User Story 17**: The blog should include smooth animations and vibrant colors to enhance the overall user experience.

![User Experience](static/images/readme/features/user-experience.gif)

---

### 404 and 500 Error Pages

Cradle Blog includes custom error pages to ensure that users are provided with a clear and helpful message when something goes wrong while navigating the site.

#### 404 Error Page (Page Not Found)
When a user tries to access a page that doesn’t exist, they are redirected to a custom 404 error page. This page provides a friendly message, letting the user know that the page they are looking for cannot be found, along with helpful navigation options to return to the homepage or explore other sections of the site.

- **User Story 18**: As a visitor, I want to see a clear and helpful message when I try to access a page that doesn’t exist (404 error), so that I can understand the issue and navigate back to a useful part of the site.

![404](static/images/readme/features/404.png)

---

#### 500 Error Page (Internal Server Error)
If something goes wrong on the server-side, users are presented with a custom 500 error page. This page informs the user that there was an internal error and that the site administrators are working to fix the issue. The 500 error page prevents the default technical error page from being shown and ensures the user experience is preserved even during technical failures.

- **User Story 19**: As a visitor, I want to see an informative message when there is an internal server error (500 error), so that I know the issue is being addressed and can still navigate to other parts of the site.

![500](static/images/readme/features/500.png)

---

Both the 404 and 500 error pages help keep the user engaged and informed, even when errors occur, and provide a clear pathway to continue using the site.

### Admin Features

The blog includes an administrative dashboard that allows the admin to manage the blog’s content and user interactions effectively. The admin has full control over creating, editing, and deleting blog posts, as well as managing user comments and reviewing inquiries submitted through the contact form. Additionally, the admin can view and delete user accounts if necessary.

Key functionalities include:
- **Manage Blog Posts**: Admins can create new blog posts, edit existing ones, and delete posts that are no longer relevant. Each post can be assigned a category and status (e.g., draft, published).
- **Manage Comments**: Admins can approve or delete comments to ensure that discussions remain constructive and spam-free.
- **View Contact Inquiries**: Admins can view user-submitted contact forms, including the sender's name, email, and message.
- **Manage User Accounts**: Admins can view user profiles and delete accounts if needed, ensuring the integrity and safety of the platform.

This robust set of admin tools ensures that the blog is consistently maintained and operates smoothly.

- **User Story 28**: As an admin, I want to manage blog posts so that I can control the content that is published. Additionally, I want to manage comments, view contact inquiries, and delete user accounts as needed to maintain site integrity.

![Admin Features](static/images/readme/features/admin-page.png)

---

# Technologies Used 

## Languages Used
* HTML
* CSS
* Javascript
* Python

## Frameworks, libraries and programs used
- [GitHub](https://github.com/vero-nika-2828/yasmin-jas-photography) - To save and store files and code for the website in a secure location 
- [Gitpod](https://gitpod.io/workspaces) - A cloud based IDE used for version control, development of the code to build the website and to commit and push to GithHb
- [Heroku](https://dashboard.heroku.com/) - was used as the deployment platform for this project
 simplifying the design process
- [Am I Responsive](http://ami.responsivedesign.is/): was used to create the multi-device mock-up you can see at the start of this README.md file.
- [WC3 Validator](https://validator.w3.org/), [Jigsaw W3 Validator](https://jigsaw.w3.org/css-validator/), [JS validator](https://jshint.com/) and [PEP8](https://pep8ci.herokuapp.com/): were all used to validate the website.
- [os](https://docs.python.org/3/library/os.html): python built-in modules.
- [Bootstrap5](https://getbootstrap.com/docs/5.0/getting-started/introduction/): was used to create the front-end design.
- [Coloors](https://coolors.co/): was used to create the color scheme.
- [Cloudinary](https://cloudinary.com/): was used to host the static files and media.
- [Gunicorn](https://gunicorn.org/): as the server for Heroku.
- [Dj_database_url](https://pypi.org/project/dj-database-url/0.5.0/): to parse the database URL from the environment variables in Heroku.
- [Psycopg2](https://pypi.org/project/psycopg2/): as an adaptor for Python and PostgreSQL databases.
- [Allauth](https://allauth.org/): for authentication, registration, account management.
- [Crispy Forms & Crispy Bootstrap5](https://django-crispy-forms.readthedocs.io/en/latest/): to style the forms.
- [djrichtextfield](https://pypi.org/project/django-richtextfield/): for handling rich text content.
- [django resized](https://pypi.org/project/django-resized/): Resizes image origin to specified size and save it in 'WEBP' format.
- [dj-cloudinary-storage](https://pypi.org/project/django-cloudinary-storage/): to facilitates integration with Cloudinary.
- [Django](https://www.djangoproject.com/start/): as a main python framework for my project.
- [Jinja2 - templating language](https://jinja.palletsprojects.com/en/3.1.x/): was used to simplify dynamic content generation, enhance security, and promote code organization in project templates.
- [App.diagram-online](https://app.diagrams.net/): was used to create the database schema.
- [Microsoft Outlook - SMTP settings](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040): was used to send email to user (scenario: forgot password).
- [Miro-online](https://miro.com/): was used to create the wireframe of the site.
- [Google Fonts](https://fonts.google.com/) - was used for the typography on the website
- [Font Awesome](https://fontawesome.com/) - was used for the iconography on the website
- Google Dev Tools - was used to troubleshoot and test features, solve issues with responsiveness and styling
- [ChatGPT](https://chatgpt.com/) - was used to generate images for blog post and compress the pictures and convert it to webp
- [Google Spreadsheet](https://docs.google.com/spreadsheets/) - was used to make the database scheme for the site.
- [Google Slides](https://docs.google.com/presentation/) - was used to draw database relationship entity diagram.
- [Google Drawio](https://app.diagrams.net/) - was used to draw Flowchart


# Testing
Find the full testing documented in [TESTING.md](TESTING.md)

# Deployment & local development

## Deployment

1. A new repository was created using 'Code-Instutute-Org/ci-full-template'.
2. A meaningful name was given to my new repository and I selected 'Create Repository'.
3. Inside the created repo select the 'Code' button above the file list on the right hand side.
4. Ensure HTTPS is selected and click the clipboard on the right of the URL to copy it.
5. Open Gitpod, creat new project folder, open the terminal, On the terminal type "git clone", then paste the copied url and press 'Enter'.
6. Version control was used throughout the project using the following commands in the terminal:
    - git add . **OR** git add "file name" - to stage the changes and get them ready for being committed to the local repo.
    - git commit -m "Description of the update" - to save the change and commit the change to the local repo
    - git push origin main - to push all committed changes to the GitHub repo.

### Forking

1. Go to [the project repository](https://github.com/Yagavi1994/Cradle).
2. In the right most top menu, click the "Fork" button.
3. There will now be a copy of the repository in your own GitHub account.

### Cloning the repo & Running the project locally

1. Go to the following repository on GitHub: <https://github.com/Yagavi1994/Cradle>.
2. At the top right of the screen, click the 'Code' button, and then click 'HTTPs'.
3. Copy the link in this field.
4. Open Gitpod, creat new project folder, open the terminal.
5. On the terminal type "git clone", then paste the copied url and press 'Enter'.
6. The clone process should now begin.

### Deploying with Heroku

I followed the below steps using the [Code Institute tutorial](https://docs.google.com/document/d/1CncA1F2JClME2S_K0w4XoV3edMjOl_HrOQoEs3h9LOo/edit#heading=h.hvy9tw74f1o0):

The following command in the IDE will create the relevant files needed for Heroku to install your project dependencies `pip3 freeze --local > requirements.txt`.

1. Go to [Heroku.com](https://dashboard.heroku.com/apps) and login, if you do not already have an account then you will need to create one.
2. Click the `New` dropdown and select `Create New App`.
3. Enter a name for your new project, all Heroku apps need to have a unique name, you will be prompted if you need to change it.
4. Select the region you are working in.

#### Heroku Settings  

You will need to set your Environment Variables - this is a key step to ensuring your application is deployed properly.

1. In the Settings tab, click on `Reveal Config Vars` and set the following variables:
   #### Add the following keys and corresponding values to it.
   ![Config Vars](static/images/readme/features/config-vars.png)
   
2. In your project:
    - Create a file `env.py` and put it into `.gitignore`.
    - Add the above keys and corresponding values mentioned in config vars in it, like DATABASE_URL, CLOUDINARY_URL and SECRET_KEY to `env.py`.
    - Comment out the original DATABASE settings from `settings.py` and add default Database code.
    - Run your migrations.

#### Heroku Deployment

In the Deploy tab:

1. Connect your Heroku account to your Github Repository following these steps:
    - Click on the `Deploy` tab and choose `Github-Connect to Github`.
    - Enter the GitHub repository name and click on `Search`.
    - Choose the correct repository for your application and click on `Connect`.
2. You can then choose to deploy the project manually or automatically, automatic deployment will generate a new application every time you push a change to Github, whereas manual deployment requires you to push the `Deploy Branch` button whenever you want a change made.
3. Once you have chosen your deployment method and have clicked `Deploy Branch` your application will be built and you should now see the `View` button, click this to open your application.
4. Be sure to set `DEBUG` to `False` in your `settings.py` before deploying.

# Credits

### Images

Images were taken from Adobe Stock and Pixabay

* Freepik
   * [Picture used for Banner](https://www.freepik.com/free-photo/top-view-childhood-cancer-awareness-month-background-concepttoys_29015039.htm#fromView=search&page=1&position=41&uuid=7918f628-075c-4250-8108-ceea74803937)

* Chat-GPT
   * [Pictures used in the Blog Post](https://chatgpt.com/)

* Meta-AI
   * [Picture used in the Logo](https://www.meta.ai/)


# Acknowledgement

I would like to thank to following people who helped me along the way in completing this project:
* Code-Institute for Full-stack development curriculum and "I Think Therefore I blog" walkthrough project which helped me to lay the basic foundation for my project.
* My Code Institute mentor, Martina Terlevic, for her valuable advice and comprehensive guidance.
* Tutors for helping me with solving few issues I had in the project.
* My family and friends for giving me moral support and for taking time to test the final version of the project.