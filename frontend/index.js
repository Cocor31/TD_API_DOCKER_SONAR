const host = window.location.protocol + "//" + window.location.host

// Init Loading Listen
document.addEventListener("DOMContentLoaded", function () {
    updateUserList();


});

// Get
async function updateUserList() {
    // Function to make the API request
    async function GetUsers() {
        return fetch(host + '/api/users')
            .then(res => res.json())
            .then(obj => { return obj.data; })
            .catch(error => console.log('Error fetching users:', error));
    }

    // Function to display the retrieved users
    function displayUsers(users) {
        const ul_users = document.getElementById('userList');
        ul_users.innerHTML = ``
        users.forEach(user => {
            ul_users.insertAdjacentHTML(
                "beforeend",
                `<li id=${user.id}>
                    <p class="userItem">
                        ${user.prenom} ${user.nom} (ID: ${user.id}) 
                    <p>  
                    <button class="deleteItem">Supprimer</button>
                </li>`
            )
        });
    }

    // Call the fetchUsers function when the page is loaded
    let users = await GetUsers();
    displayUsers(users);
    ecoutedeleteUser();
    ecouteclickUser();

}

// Put
function addUser() {
    function putUser(user) {
        const options = {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        fetch(host + "/api/users", options)
            .then((response) => response.json())
            .catch(function (error) {
                alert("Error Put user" + error.message);
            })
    }

    let form = document.querySelector(".add_user_form");
    let user = {
        nom: form.lastName.value,
        prenom: form.firstName.value
    };
    putUser(user);
    updateUserList()
    form.lastName.value = ""
    form.firstName.value = ""
}

// Delete
function ecoutedeleteUser() {
    async function deleteUser(user_id) {
        const options = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await fetch(host + "/api/users/" + user_id, options);
            return console.log(`User ID ${user_id} successfully Deleted (status: ${res.status} )`);
        } catch (error) {
            return console.log('Error Patch user:', error);
        }


    }
    let deleteItems = document.querySelectorAll(".deleteItem");
    deleteItems.forEach(function (button) {
        button.addEventListener("click", async function () {
            const user_id = button.closest("li").getAttribute("id");
            await deleteUser(user_id);
            updateUserList();
        })
    })

};


// Patch
function ecouteclickUser() {
    // Function to make the API request
    async function GetOneUser(id_user) {
        try {
            const res = await fetch(host + '/api/users/' + id_user);
            const obj = await res.json();
            return obj.data;
        } catch (error) {
            return console.log('Error fetching users:', error);
        }
    }

    // Function to display the retrieved user in section patch
    function displayUser(user) {
        let section = document.querySelector(".patch_user_form");
        section.id_user.value = user.id
        section.lastName.value = user.nom
        section.firstName.value = user.prenom
    }

    let usersItems = document.querySelectorAll(".userItem");
    usersItems.forEach(balise_p => {
        balise_p.addEventListener("click", async function () {
            const user_id = balise_p.closest("li").getAttribute("id");
            let user = await GetOneUser(user_id);
            displayUser(user);
        })
    })
};

async function alterUser() {
    async function patchUser(user) {
        const options = {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await fetch(host + "/api/users/" + user.id, options);
            const obj = await res.json();
            return console.log(obj);
        } catch (error) {
            return console.log('Error Patch user:', error);
        }
    }

    let form = document.querySelector(".patch_user_form");
    let user = {
        id: form.id_user.value,
        nom: form.lastName.value,
        prenom: form.firstName.value
    };

    await patchUser(user);
    updateUserList();
}