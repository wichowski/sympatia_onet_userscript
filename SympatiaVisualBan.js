// ==UserScript==
// @name         Remove User from Sympatia Search Results
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Remove user from search results on Sympatia and store the profile name in local storage incrementally
// @author       wicher
// @match        https://sympatia.onet.pl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to get data from local storage
    function getLocalStorageData(key) {
        let data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    // Function to set data in local storage
    function setLocalStorageData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Function to extract profile name from href
    function extractProfileName(href) {
        let match = href.match(/\/user\/([^\/]+)/);
        return match ? match[1] : null;
    }

    // Function to add "X" button to user cards
    function addRemoveButtons() {
        console.log('Adding remove buttons...');

        // Select all <a> elements with class names that start with 'UserCard_'
        let userCards = document.querySelectorAll('a[class^="UserCard_"]');

        if (!userCards.length) {
            console.error('No user cards found.');
            return;
        }

        console.log(`Found ${userCards.length} user cards.`);

        const removedUsers = getLocalStorageData('removedUsers');

        for (let card of userCards) {
            console.log('Processing card:', card);
            let href = card.getAttribute('href');
            let profileName = extractProfileName(href);
            console.log('Profile name extracted:', profileName);

            if (profileName && removedUsers.includes(profileName)) {
                console.log(`Hiding card for profile: ${profileName}`);
                card.style.display = 'none';
                continue;
            }

            if (!card.querySelector('.remove-box')) {
                let removeBox = document.createElement('div');
                removeBox.className = 'remove-box';
                removeBox.style.position = 'absolute';
                removeBox.style.top = '10px'; // Adjusted top position
                removeBox.style.right = '10px'; // Adjusted right position
                removeBox.style.zIndex = '1000';
                removeBox.style.backgroundColor = 'red';
                removeBox.style.color = 'white';
                removeBox.style.borderRadius = '50%';
                removeBox.style.width = '20px';
                removeBox.style.height = '20px';
                removeBox.style.display = 'flex';
                removeBox.style.alignItems = 'center';
                removeBox.style.justifyContent = 'center';
                removeBox.style.cursor = 'pointer';
                removeBox.role = 'link';
                removeBox.innerHTML = 'X';

                removeBox.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log(`Removing card for profile: ${profileName}`);
                    card.style.display = 'none';
                    if (profileName && !removedUsers.includes(profileName)) {
                        removedUsers.push(profileName);
                        setLocalStorageData('removedUsers', removedUsers);
                    }
                });

                card.style.position = 'relative';
                card.appendChild(removeBox);
            }
        }
    }
function addEventDelegation() {


    // Function to get data from local storage
    function getLocalStorageData(key) {
        let data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    // Function to set data in local storage
    function setLocalStorageData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Function to extract profile name from href
    function extractProfileName(href) {
        let match = href.match(/\/user\/([^\/]+)/);
        return match ? match[1] : null;
    }

    // Function to add "X" button to user cards
    function addRemoveButtons() {
        console.log('Adding remove buttons...');

        // Select all <a> elements with class names that start with 'UserCard_'
        let userCards = document.querySelectorAll('a[class^="UserCard_"]');

        if (!userCards.length) {
            console.error('No user cards found.');
            return;
        }

        console.log(`Found ${userCards.length} user cards.`);

        const removedUsers = getLocalStorageData('removedUsers');

        for (let card of userCards) {
            console.log('Processing card:', card);
            let href = card.getAttribute('href');
            let profileName = extractProfileName(href);
            console.log('Profile name extracted:', profileName);

            if (profileName && removedUsers.includes(profileName)) {
                console.log(`Hiding card for profile: ${profileName}`);
                card.style.display = 'none';
                continue;
            }

            if (!card.querySelector('.remove-box')) {
                let removeBox = document.createElement('div');
                removeBox.className = 'remove-box';
                removeBox.style.position = 'absolute';
                removeBox.style.top = '10px'; // Adjusted top position
                removeBox.style.right = '10px'; // Adjusted right position
                removeBox.style.zIndex = '1000';
                removeBox.style.backgroundColor = 'red';
                removeBox.style.color = 'white';
                removeBox.style.borderRadius = '50%';
                removeBox.style.width = '20px';
                removeBox.style.height = '20px';
                removeBox.style.display = 'flex';
                removeBox.style.alignItems = 'center';
                removeBox.style.justifyContent = 'center';
                removeBox.style.cursor = 'pointer';
                removeBox.role = 'link';
                removeBox.innerHTML = 'X';

                removeBox.addEventListener('click', function(event) {
                        // Function to set data in local storage
                    function setLocalStorageData(key, value) {
                        localStorage.setItem(key, JSON.stringify(value));
                    };

                    event.preventDefault();
                    event.stopPropagation();
                    console.log(`Removing card for profile: ${profileName}`);
                    card.style.display = 'none';
                    if (profileName && !removedUsers.includes(profileName)) {
                        removedUsers.push(profileName);
                        setLocalStorageData('removedUsers', removedUsers);
                    }
                });

                card.style.position = 'relative';
                card.appendChild(removeBox);
            }
        }
    }




    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-box')) {
            event.preventDefault();
            event.stopPropagation();

            const card = event.target.closest('a'); // Find the nearest <a> tag
            if (!card) return;
            let href = card.getAttribute('href');
            let profileName = extractProfileName(href);
            console.log(`Removing card for profile: ${profileName}`);
            card.style.display = 'none';

            if (profileName) {
                const removedUsers = getLocalStorageData('removedUsers');
                if (!removedUsers.includes(profileName)) {
                    removedUsers.push(profileName);
                    setLocalStorageData('removedUsers', removedUsers);
                }
            }
        }
    });
}

// Initialize event delegation on page load


    // Function to observe changes in the broader container
    function observeUserCards() {
        console.log('Setting up MutationObserver...');

        // Select a higher-level container that includes all user card containers
        let targetNode = document.querySelector('body'); // Adjust this selector if a more specific container is available

        if (!targetNode) {
            console.error('Target node for MutationObserver not found.');
            return;
        }

        console.log('Target node found.');
        const config = { childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('Child list changed.');
                    addRemoveButtons();
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    // Initial run to handle already present user cards
    function initialRun() {
        addRemoveButtons();
        observeUserCards();
    }

    // Run the function on page load
    window.addEventListener('load', initialRun);
    window.addEventListener('load', addEventDelegation);
})();

