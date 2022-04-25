/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/inventory.js ***!
  \**************************/


(function () {
  var stateInventories = {};
  var MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    authInsufficient: "Please only use letters and numbers for username and do not use 'dog' as username, no space before between and after username",
    requiredUsername: 'Your username is required to login',
    noSuchQuantity: "Quantity can only be number and not less than 0",
    "default": 'Something went wrong.  Please try again'
  };
  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();
  addAbilityToChangeQuantity();

  function setLoggedIn(isLoggedIn) {
    if (isLoggedIn) {
      renderLoggedInPage();
    } else {
      renderNotLoggedInPage();
      addAbilityToLogin();
    }

    renderStatus("");
  }

  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET'
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function checkForSession() {
    fetchSession().then(populateInventories)["catch"](function () {
      return setLoggedIn(false);
    });
  }

  function renderOnLogin(inventories) {
    stateInventories = inventories;
    setLoggedIn(true);
  }

  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        username: username
      })
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function addAbilityToLogin() {
    if (setLoggedIn) {
      var buttonEl = document.querySelector('.login button');
      var usernameEl = document.querySelector('.login__username');

      if (!buttonEl || !usernameEl) {
        return;
      }

      buttonEl.addEventListener('click', function (e) {
        var username = usernameEl.value;
        usernameEl.value = "";
        fetchLogin(username).then(renderOnLogin)["catch"](function (error) {
          return renderStatus(error);
        });
      });
    }
  }

  function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE'
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function addAbilityToLogout() {
    var controlsEl = document.querySelector('.controls');

    if (!controlsEl) {
      return;
    }

    controlsEl.addEventListener('click', function (e) {
      stateInventories = {};
      fetchLogout().then(function () {
        return setLoggedIn(false);
      })["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }

  function fetchInventories() {
    return fetch('/api/inventories')["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function populateInventories() {
    fetchInventories().then(function (rawInventories) {
      stateInventories = rawInventories;
      setLoggedIn(true);
      renderLoggedInPage();
      renderStatus('');
    })["catch"](function (error) {
      renderStatus(error);
    });
  }

  function fetchUpdateInventory(id, inventoryUpdates) {
    return fetch("/api/inventories/".concat(id), {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(inventoryUpdates)
    })["catch"](function () {
      return Promise.reject({
        error: 'networkError'
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function addAbilityToChangeQuantity() {
    var listEl = document.querySelector('.inventories');

    if (!listEl) {
      return;
    }

    var quantityDetail = 0;
    listEl.addEventListener('click', function (e) {
      var id = e.target.dataset.id;

      if (e.target.classList.contains('addQuantity')) {
        quantityDetail = stateInventories[id].quantity + 1;
      } else if (e.target.classList.contains('subtractQuantity')) {
        if (stateInventories[id].quantity <= 0) {
          e.target.disabled = true;
        } else {
          quantityDetail = stateInventories[id].quantity - 1;
        }
      } else if (!e.target.classList.contains("inventory_detail")) {
        return;
      }

      fetchUpdateInventory(id, {
        quantity: quantityDetail
      }).then(function (inventory) {
        stateInventories[id] = inventory;
        renderLoggedInPage();
        renderStatus('');
      })["catch"](function (err) {
        renderStatus(err);
      });
    });
  }

  function renderLoggedInPage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        add = _ref.add;

    var loginHtml = document.querySelector('.login');
    loginHtml.innerHTML = "";
    var inventoryHtml = Object.values(stateInventories).map(function (inventory) {
      return "\n    <li class=\"inventory\" data-id=\"".concat(inventory.id, "\">\n      <label >\n        <span class=\"inventory_detail\" data-id=\"").concat(inventory.id, "\">").concat(inventory.name, "</span>   \n        <button class=\"inventory_detail subtractQuantity\" data-id=\"").concat(inventory.id, "\">-</button>\n        <span class=\"inventory_detail item-quantity\">").concat(inventory.quantity, "</span>\n        <button class=\"inventory_detail addQuantity\" data-id=\"").concat(inventory.id, "\">+</button> \n      </label>\n    </li>\n    ");
    });
    var inventoriesEl = document.querySelector(".inventories");
    inventoriesEl.innerHTML = inventoryHtml;
    var logoutBtnHtml = " \n      <button class=\"logout\">Logout</button>\n   ";
    var controlsEl = document.querySelector(".controls");

    if (!controlsEl) {
      return;
    } else {
      controlsEl.innerHTML = logoutBtnHtml;
    }

    var childLi = Array.from(inventoriesEl.querySelectorAll("li"));
    childLi.map(function (child) {
      var value = child.querySelector(".item-quantity").innerText;

      if (value === "0") {
        child.querySelector(".subtractQuantity").disabled = true;
      }
    });
  }

  function renderNotLoggedInPage() {
    var loginHtml = "\n      <form action=\"#\" id=\"form_login\">\n        <label>\n          <span>Username:</span>\n          <input class=\"login__username\">\n        </label>\n        <button type=\"button\">Login</button>\n      </form>\n    ";
    var loginEl = document.querySelector('.login');
    loginEl.innerHTML = loginHtml;
    var inventoriesEl = document.querySelector(".inventories");
    inventoriesEl.innerHTML = "";
    var controlsEl = document.querySelector(".controls");
    controlsEl.innerHTML = "";
  }

  function renderStatus(message) {
    var statusEl = document.querySelector('.status');

    if (!message) {
      statusEl.innerText = '';
      return;
    }

    var key = message !== null && message !== void 0 && message.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES["default"];
  }
})();
/******/ })()
;
//# sourceMappingURL=inventory.js.map