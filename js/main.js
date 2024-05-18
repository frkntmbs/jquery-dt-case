$(document).ready(function () {

    // Inital Data Table
    const table = $("#myTable").DataTable({
        autoWidth: false,
        responsive: true,

        colReorder: true,
        columnDefs: [{ visible: false, target: 0 }],

        // Set Button Position
        dom: '<"table-top"fl>rt<"table-bottom"ip<"table-export-btn"B>>',

        // Set Button Customization
        buttons: [
            {
                extend: 'csv',
                text: 'Export CSV <i class="ri-file-excel-2-line"></i>',
                className: 'btn'
            },
            {
                extend: 'pdf',
                text: 'Export PDF <i class="ri-file-pdf-2-line"></i>',
                className: 'btn'
            }
        ],

        // Set Search Input Customization
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search..."
        },

        // Column definitions (Turkish Lira Currency)
        columnDefs: [
            {
                targets: 3,
                render: function (data) {
                    return new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: 'TRY'
                    }).format(data);
                }
            }
        ],
    });

    // Add data to table function
    function addDataToTable(data) {
        const date = new Date();

        data.forEach((product) => {
            table.row.add([product.id, product.brand, product.category, product.price, date.toLocaleDateString()]);
        });

        // Recalculate table
        table.draw();
    }

    // Get data for table
    axios.get("https://dummyjson.com/products?limit=100").then((response) => {
        addDataToTable(response.data.products);
    });
});


