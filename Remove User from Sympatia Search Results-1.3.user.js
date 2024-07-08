// ==UserScript==
// @name         Remove User from Sympatia Search Results
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Remove user from search results on Sympatia and store the profile name in cookies incrementally
// @author       ChatGPT
// @match        https://sympatia.onet.pl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to get cookies
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return JSON.parse(decodeURIComponent(match[2]));
        return [];
    }

    // Function to set cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (encodeURIComponent(JSON.stringify(value)) || "")  + expires + "; path=/";
    }

    // Function to extract profile name from href
    function extractProfileName(href) {
        const match = href.match(/^\/user\/([^\/]+)\//);
        return match ? match[1] : null;
    }

    // Function to add "X" button to user cards
    function addRemoveButtons() {
        const userCardsContainer = document.evaluate('//*[@id="__next"]/div[3]/div/div[2]/div[2]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!userCardsContainer) userCardsContainer = document.evaluate('//*[@id="__next"]/div[3]/div/div[2]/div[2]/div[1]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        const removedUsers = getCookie('removedUsers');
        const userCards = userCardsContainer.getElementsByTagName('a');

        for (let card of userCards) {
            let href = card.getAttribute('href');
            let profileName = extractProfileName(href);
            if (profileName && removedUsers.includes(profileName)) {
                card.style.display = 'none';
                continue;
            }

            if (!card.querySelector('.remove-box')) {
                let removeBox = document.createElement('div');
                removeBox.className = 'remove-box';
                removeBox.style.position = 'absolute';
                removeBox.style.top = '5px';
                removeBox.style.right = '5px';
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
                removeBox.innerHTML = 'X';

                removeBox.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    card.style.display = 'none';
                    if (profileName && !removedUsers.includes(profileName)) {
                        removedUsers.push(profileName);
                        setCookie('removedUsers', removedUsers, 365);
                    }
                });

                card.style.position = 'relative';
                card.appendChild(removeBox);
            }
        }
    }

    // Function to observe changes in the user card container
    function observeUserCards() {
        const targetNode = document.evaluate('//*[@id="__next"]/div[3]/div/div[2]/div[2]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!targetNode) targetNode = document.evaluate('//*[@id="__next"]/div[3]/div/div[2]/div[2]/div[1]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        const config = { childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    addRemoveButtons();
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    // Run the function on page load and set up the observer
    window.addEventListener('load', () => {
        addRemoveButtons();
        observeUserCards();
    });
})();
