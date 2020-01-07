$(function () {

  // VARIABLES //

  // navbar section
  const messages = document.getElementById('message-dropdown')
  const notification = document.getElementById('notification-dropdown')
  // total sales section
  const totalSales = document.getElementById('total-sale');
  const totalPurchases = document.getElementById('total-purchases');
  const totalOrders = document.getElementById('total-orders');
  const totalGrowth = document.getElementById('total-growth');
  // user & project section
  const userCount = document.getElementById('user-count');
  const userGrowth = document.getElementById('user-growth');
  const projectCount = document.getElementById('project-count');
  const projectGrowth = document.getElementById('project-growth');
  // downloads section
  const totalOffline = document.getElementById('offline-data');
  const totalOnline = document.getElementById('online-data');
  // total sales section
  const tsRevenue = document.getElementById('ts-revenue');
  const tsReturns = document.getElementById('ts-returns');
  const tsQueries = document.getElementById('ts-queries');
  const tsInvoices = document.getElementById('ts-invoices');
  // updates section
  const updates = document.getElementById('get-updates');
  // tickets section
  const tickets = document.getElementById('get-tickets');
  // sale report section
  const sroDownloads = document.getElementById('sro-downloads')
  const sroPurchases = document.getElementById('sro-purchases')
  const sroUsers = document.getElementById('sro-users')
  const sroGrowth = document.getElementById('sro-growth');
  // open invoices section
  const openInvoices = document.getElementById('get-openinvoices');

  // URLS //
  const urlMessages = 'https://inlupp-fa.azurewebsites.net/api/messages';
  const urlNotifications = 'https://inlupp-fa.azurewebsites.net/api/notifications';
  const urlTotalSales = 'https://inlupp-fa.azurewebsites.net/api/total-sales';
  const urlTotalPurcheses = 'https://inlupp-fa.azurewebsites.net/api/total-purchases';
  const urlTotalOrders = 'https://inlupp-fa.azurewebsites.net/api/total-orders';
  const urlTotalGrowth = 'https://inlupp-fa.azurewebsites.net/api/total-growth';
  const urlTotalUsers = 'https://inlupp-fa.azurewebsites.net/api/total-users';
  const urlTotalProjects = 'https://inlupp-fa.azurewebsites.net/api/total-projects';
  const urlDownloads = 'https://inlupp-fa.azurewebsites.net/api/downloads';
  const urlTotalSalesChart = 'https://inlupp-fa.azurewebsites.net/api/total-sales-chart';
  const urlUpdates = 'https://inlupp-fa.azurewebsites.net/api/updates';
  const urlTickets = 'https://inlupp-fa.azurewebsites.net/api/tickets';
  const urlDistribution = 'https://inlupp-fa.azurewebsites.net/api/distribution';
  const urlSaleReport = 'https://inlupp-fa.azurewebsites.net/api/sales-report';
  const urlOpenInvoices = 'https://inlupp-fa.azurewebsites.net/api/open-invoices';


  // FUNCTIONS //

  // NUMBER FORMATING //
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  // GET MESSAGES //
  function getMessages() {
    fetch(urlMessages)
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
  function getNotifications() {
    fetch(urlNotifications)
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

  // GET TOTAL USERS //
  function getTotalUsers() {
    fetch(urlTotalUsers)
      .then(res => res.json())
      .then(data => {
        userCount.innerHTML = formatNumber(data.users);
        userGrowth.innerHTML = `+${data.growth}%`;

        if ($("#users-chart").length) {
          var areaData = {
            labels: data.dataset.labels,
            datasets: [{
              data: data.dataset.data,
              backgroundColor: [
                '#e0fff4'
              ],
              borderWidth: 2,
              borderColor: "#00c689",
              fill: 'origin',
              label: "purchases"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .35
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      })
  }
  getTotalUsers();

  // GET TOTAL PROJECTS //
  function getTotalProjects() {
    fetch(urlTotalProjects)
      .then(res => res.json())
      .then(data => {

        projectCount.innerHTML = `${data.projects}%`;
        projectGrowth.innerHTML = `+${data.growth}%`;

        if ($("#projects-chart").length) {
          var areaData = {
            labels: data.dataset.labels,
            datasets: [{
              data: data.dataset.data,
              backgroundColor: [
                '#e5f2ff'
              ],
              borderWidth: 2,
              borderColor: "#3da5f4",
              fill: 'origin',
              label: "purchases"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .05
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      })
  }
  getTotalProjects();

  // GET DOWNLOADS //
  function getDownloads() {
    fetch(urlDownloads)
      .then(res => res.json())
      .then(data => {
        totalOffline.innerHTML = formatNumber(data[0].offlineAmount);
        totalOnline.innerHTML = formatNumber(data[1].onlineAmount);

        if ($('#offlineProgress').length) {
          var bar = new ProgressBar.Circle(offlineProgress, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#fff",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#f1536e',
              width: 6
            },
            to: {
              color: '#f1536e',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar.text.style.fontSize = '1rem';
          bar.animate(data[0].circleValue); // Number from 0.0 to 1.0
        }

        if ($('#onlineProgress').length) {
          var bar = new ProgressBar.Circle(onlineProgress, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#fff",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#fda006',
              width: 6
            },
            to: {
              color: '#fda006',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar.text.style.fontSize = '1rem';
          bar.animate(data[1].circleValue); // Number from 0.0 to 1.0
        }

      })
  }
  getDownloads();

  // GET TOTAL SALES //
  function getTotalSales() {
    fetch(urlTotalSalesChart)
      .then(res => res.json())
      .then(data => {
        tsRevenue.innerHTML = formatNumber(data.revenue);
        tsReturns.innerHTML = formatNumber(data.returns);
        tsQueries.innerHTML = formatNumber(data.queries);
        tsInvoices.innerHTML = formatNumber(data.invoices);

        if ($("#total-sales-chart").length) {
          var areaData = {
            labels: data.labels,
            datasets: [
              {
                data: data.datasets[0].data,
                backgroundColor: [
                  'rgba(61, 165, 244, .0)'
                ],
                borderColor: [
                  'rgb(61, 165, 244)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: "services"
              },
              {
                data: data.datasets[1].data,
                backgroundColor: [
                  'rgba(241, 83, 110, .0)'
                ],
                borderColor: [
                  'rgb(241, 83, 110)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: "services"
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  display: true,
                  padding: 20,
                  fontColor: "#000",
                  fontSize: 14
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  fontColor: "#000",
                  fontSize: 14,
                  padding: 18,
                  stepSize: 100000,
                  callback: function (value) {
                    var ranges = [
                      { divider: 1e6, suffix: 'M' },
                      { divider: 1e3, suffix: 'k' }
                    ];
                    function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                          return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                    }
                    return formatNumber(value);
                  }
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .37
              },
              point: {
                radius: 0
              }
            }
          }
          var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
          var revenueChart = new Chart(revenueChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }

      })
  }
  getTotalSales();

  // GET TOTAL STATS //
  function getTotalStat() {

    fetch(urlTotalSales)
      .then(res => res.json())
      .then(data => {
        totalSales.innerHTML = data.currency + data.amount;
      })
    fetch(urlTotalPurcheses)
      .then(res => res.json())
      .then(data => {
        totalPurchases.innerHTML = data.currency + data.amount;
      })
    fetch(urlTotalOrders)
      .then(res => res.json())
      .then(data => {
        totalOrders.innerHTML = data.currency + data.amount;
      })
    fetch(urlTotalGrowth)
      .then(res => res.json())
      .then(data => {
        totalGrowth.innerHTML = data.currency + data.amount;
      })

  }
  getTotalStat()

  // GET UPDATES //
  function getUpdates() {
    fetch(urlUpdates)
      .then(res => res.json())
      .then(data => {

        for (update of data) {
          updates.insertAdjacentHTML('beforeend', `
        <ul class="bullet-line-list mt-4">
        <li>
          <h6>${update.title}</h6>
          <p class="mt-2">${update.message} </p>
          <p class="text-muted mb-4">
            <i class="mdi mdi-clock-outline"></i>
            ${update.time}.
          </p>
        </li>
              `)
        }
      })
  }
  getUpdates();

  // GET TICKETS //
  function getTickets() {
    fetch(urlTickets)
      .then(res => res.json())
      .then(data => {

        for (ticket of data[1].tickets) {

          const dateSplit = ticket.date.split(",");
          const date = dateSplit[0];
          const time = dateSplit[1];

          const nameSplit = ticket.name.split(" ");
          const firstName = nameSplit[0];
          const lastName = nameSplit[1];

          const letterFirstName = firstName.charAt(0);
          const letterLastName = lastName.charAt(0);

          tickets.insertAdjacentHTML('beforeend', `
          <tr>
          <td class="pl-0">
            <div class="icon-rounded-primary icon-rounded-md">
              <h4 class="font-weight-medium">${letterFirstName}${letterLastName}</h4>
            </div>
          </td>
          <td>
            <p class="mb-0">${ticket.name}</p>
            <p class="text-muted mb-0">${ticket.city}</p>
          </td>
          <td>
            <p class="mb-0">${date}</p>
            <p class="text-muted mb-0">${time}</p>
          </td>
          <td>
            <p class="mb-0">${ticket.project}</p>
            <p class="text-muted mb-0">${ticket.other}</p>
          </td>
          <td class="pr-0">
            <i class="mdi mdi-dots-horizontal icon-sm cursor-pointer"></i>
          </td>
        </tr>
                `)
        }
      })
  }
  getTickets();

  // GET DISTRIBUTION //
  function getDistribution() {
    fetch(urlDistribution)
      .then(res => res.json())
      .then(data => {
        if ($("#distribution-chart").length) {
          var areaData = {
            labels: data.labels,
            datasets: [{
              data: data.data,
              backgroundColor: [
                "#3da5f4", "#f1536e", "#fda006"
              ],
              borderColor: "rgba(0,0,0,0)"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 72,
            elements: {
              arc: {
                borderWidth: 4
              }
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            legendCallback: function (chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
              text.push(data.cities[0]);
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
              text.push(data.cities[1]);
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
              text.push(data.cities[2]);
              text.push('</div>');
              text.push('</div>');
              return text.join("");
            },
          }
          var distributionChartPlugins = {
            beforeDraw: function (chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

              ctx.restore();
              var fontSize = .96;
              ctx.font = "600 " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";

              var text = `${data.procentage}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
          var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
        }


      })
  }
  getDistribution();

  // GET SALE REPORT //
  function getSaleReport() {
    fetch(urlSaleReport)
      .then(res => res.json())
      .then(data => {
        sroDownloads.innerHTML = formatNumber(data.downloads);
        sroPurchases.innerHTML = formatNumber(data.purchases);
        sroUsers.innerHTML = data.users;
        sroGrowth.innerHTML = data.growth;

        if ($("#sale-report-chart").length) {
          var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: 'bar',
            data: {
              labels: data.labels,
              datasets: [{
                label: data.datasets[0].label,
                data: data.datasets[0].data,
                backgroundColor: data.datasets[0].backgroundColor
              }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [{
                  display: true,
                  gridLines: {
                    drawBorder: false
                  },
                  ticks: {
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14,
                    stepSize: 10000,
                    callback: function (value) {
                      var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                          }
                        }
                        return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }],
                xAxes: [{
                  stacked: false,
                  categoryPercentage: .6,
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: true
                  },
                  barPercentage: .7
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
        }

      })
  }
  getSaleReport();

  // GET OPEN INVOICES
  function getOpenInvoices() {
    fetch(urlOpenInvoices)
      .then(res => res.json())
      .then(data => {
        for (output of data) {
          openInvoices.insertAdjacentHTML('beforeend',
            `
              <tr>
              <td>${output.invoice}</td>
              <td>${output.customer}</td>
              <td>${output.shipping}</td>
              <td class="font-weight-bold">${output.currency}${output.bestPrice}</td>
              <td>${output.currency}${output.purchasedPrice}</td>
              <td>
              <div class="badge status-${output.status} badge-fw">${output.status}</div>
              </td>
              </tr>
              `)

          $('.status-Progress').css({ "background-color": "#00c689", "color": "#fff" })
          $('.status-Open').css({ "background-color": "#fda006", "color": "#212529" })
          $('.status-On').css({ "background-color": "#f1536e", "color": "#fff" })
          $('.status-Closed').css({ "background-color": "#212529", "color": "#fff" })

        }
      })
  }
  getOpenInvoices();



});