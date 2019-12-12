// GET MESSAGES //
const messages = document.getElementById('message-dropdown')
function getMessages() {
    fetch('https://inlupp-fa.azurewebsites.net/api/messages')
        .then(res => res.json())
        .then(data => {
            for (message of data) {
                messages.insertAdjacentHTML('beforeend', `
                <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <img src="https://via.placeholder.com/36x36" alt="image" class="profile-pic">
                    </div>
                    <div class="preview-item-content flex-grow">
                      <h6 class="preview-subject ellipsis font-weight-normal">${message.from}
                      </h6>
                      <p class="font-weight-light small-text text-muted mb-0">
                        ${message.title}
                      </p>
                    </div>
                  </a>
                `)
            }
        })
}
getMessages();

// GET NOTIFICATIONS //
const notification = document.getElementById('notification-dropdown')
function getNotifications() {
    fetch('https://inlupp-fa.azurewebsites.net/api/notifications')
        .then(res => res.json())
        .then(data => {
            for (message of data) {
                notification.insertAdjacentHTML('beforeend', `
                <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                  <div class="preview-icon bg-success">
                    <i class="mdi mdi-information mx-0"></i>
                  </div>
                </div>
                <div class="preview-item-content">
                  <h6 class="preview-subject font-weight-normal">${message.title}</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    ${message.subtitle}
                  </p>
                </div>
              </a>
                `)
            }
        })
}
getNotifications();

// GET USER NAME //
function getFullName(firstname, lastname) {
    fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstname}&lastname=${lastname}`)
        .then(res => res.text())
        .then(data => {
            document.getElementById('welcome-user').innerHTML = `Hi ${data}, Welcome back!`
            document.getElementById('nav-name').innerHTML = data;
        })
}
getFullName('Jonas', 'Näsman')

// GET TOTAL SALES //
function getTotalSales() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-sales')
        .then(res => res.json())
        .then(data => {
            const currency = data.currency;
            const amount = data.amount;
            document.getElementById('total-sale').innerHTML = currency + amount;
        })
}
getTotalSales()

// GET TOTAL PURCHASES //
function getTotalPurchases() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-purchases')
        .then(res => res.json())
        .then(data => {
            const currency = data.currency;
            const amount = data.amount;
            document.getElementById('total-purchases').innerHTML = currency + amount;
        })
}
getTotalPurchases()

// GET TOTAL ORDERS //
function getTotalOrders() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-orders')
        .then(res => res.json())
        .then(data => {
            const currency = data.currency;
            const amount = data.amount;
            document.getElementById('total-orders').innerHTML = currency + amount;
        })
}
getTotalOrders()

// GET TOTAL GROWTH //
function getTotalGrowth() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-growth')
        .then(res => res.json())
        .then(data => {
            const currency = data.currency;
            const amount = data.amount;
            document.getElementById('total-growth').innerHTML = currency + amount;
        })
}
getTotalGrowth()



