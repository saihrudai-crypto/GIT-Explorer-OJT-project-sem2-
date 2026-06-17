 // Simple global variables
        var profileData = null;
        var reposData = [];

        // Main function to search a user
        async function searchGitHubUser(username) {
            // Hide previous results
            document.getElementById("profile-area").classList.add("hidden");
            document.getElementById("repos-area").classList.add("hidden");

            try {
                // Fetch user profile data
                var userResponse = await fetch("https://api.github.com/users/" + username);

                // If response is not OK, show native alert box and stop
                if (userResponse.status !== 200) {
                    alert("username not valid");
                     searchGitHubUser("saihrudai-crypto");
                     document.getElementById("input").value = '';
                    return;
                }

                // Save profile JSON
                profileData = await userResponse.json();

                // Fetch repository list
                var reposResponse = await fetch("https://api.github.com/users/" + username + "/repos");
                reposData = await reposResponse.json();

                // Show populated HTML
                showProfile();
                showRepos();

            } catch (err) {
                alert("username not valid");
            }
        }

        // Fill in profile details
        function showProfile() {
            document.getElementById("avatar-image").src = profileData.avatar_url;
            document.getElementById("user-display-name").innerText = profileData.name || profileData.login;
            document.getElementById("user-bio").innerText = profileData.bio || "No bio available.";
            document.getElementById("stat-repos").innerText = profileData.public_repos;
            document.getElementById("stat-followers").innerText = profileData.followers;
            document.getElementById("stat-following").innerText = profileData.following;

            document.getElementById("profile-area").classList.remove("hidden");
        }

        // Fill in repository list items
        function showRepos() {
            var listContainer = document.getElementById("repos-list");
            listContainer.innerHTML = ""; // Clear old repos

            // Display up to 5 repos using a simple loop
           
            for (var i = 0; i < reposData.length; i++) {
                var repo = reposData[i];
                var description = repo.description || "No description provided.";

                var itemHTML = `
                    <div class="repo-item">
                        <a href="${repo.html_url}" target="_blank" class="repo-link">${repo.name}</a>
                        <p class="repo-description">${description}</p>
                    </div>
                `;

                listContainer.innerHTML += itemHTML;
            }

            document.getElementById("repos-area").classList.remove("hidden");
        }

        // Search submit button action listener
        document.getElementById("form").addEventListener("submit", function(e) {
            e.preventDefault(); // Stop page refresh
            var searchedUser = document.getElementById("input").value;
            searchGitHubUser(searchedUser);
        });


        // Search for "saihrudai-crypto" by default on initial start
        window.onload = function() {
            searchGitHubUser("saihrudai-crypto");
        };
