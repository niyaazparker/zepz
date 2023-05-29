
# Zepz Project

Fetch a list of StackOverflow users and display the list on the screen using React Js

# Time taken 

3.5 hours

# Clone repo 

https://github.com/niyaazparker/zepz.

### `Run proxy in seperate terminal to avoid Cross-Origin Resource Sharing policy issue enforced by web browsers`
node proxy.js

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\


## `Error-encountered` 

Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing). Status code: 301

The issue was related to the Cross-Origin Resource Sharing policy enforced by web browsers. This happens when a web application running on one domain tries to make a request to another domain, and the server of the target domain does not include the necessary CORS headers to allow the request.

## `Solution`

Use a proxy server , I setup a simple server-side proxy to make the API request on behalf of the React app. This way, the request will be made from my own domain, avoiding the CORS restrictions. Here's an example using Express.js
-	I installed cors and express packages.
-	Created a proxy.js file in the root with the necessary code.
-	Updated my code in app.js file to to make the API request to the proxy server instead.
-	Ran the proxy server in a separate terminal with the line (node proxy.js)
-	Restarted my application so that the requests will now be made to the proxy server running on my local which will forward them to stack exchange API.


## `What was added`

**Auto search :** I added a new state variable **searchQuery** to store the search input value. 
The **handleSearch** function is called whenever the input value changes, updating the **searchQuery** state accordingly.
The **filteredUsers** variable is to store the filtered user list. It filters the users array based on whether the **display_name** includes the search query.

**Paging:** I added some new state variables: **currentPage** and **usersPerPage**. The **currentPage** state keeps track of the currently selected page, and **usersPerPage** specifies the number of users to display per page.

You calculate the **indexOfLastUser** and **indexOfFirstUser** to determine the range of users to display based on the current page and **usersPerPage**.
The **paginate** function is used to handle page changes. It sets the **currentPage** state to the selected page number.

Lastly, I added a navigation component at the bottom, displaying pagination buttons based on the total number of pages required.

Now, you can navigate through the list of users using the pagination buttons. The number of users displayed per page is determined by the **usersPerPage** state variable.

**Expand/collapse:** I added a new variable **expandedUser** to keep track of the currently expanded user. When a user clicks on a item, the **handleExpand** function is called with the **user_id** as the argument. If the clicked user is the currently expanded user, it collapses the item by setting **expandedUser** to null. If the clicked user is not expanded, it sets the **user_id** as the new expanded user.

**Fontaweome Library included:**
npm install @fortawesome/fontawesome-svg-core \
            @fortawesome/free-solid-svg-icons \
            @fortawesome/react-fontawesome


**Toggled follow button text:** I modified the **handleFollowUser** function.
**Removed disabled attribute from blocked button when the follow button is clicked:** Modified the **handleFollowUser** function.

## `Left out`

**Unit tests** : I am still new to unit testing and have taken up a course on working through tests, With that said i am a fast learner and would grasp the process quickly if working with on daily basis.

