$(document).ready(function () {
    $('#addRow').click(function () {
        // Get form values
        var date = $('#date').val();
        var start = $('#start').val();
        var end = $('#end').val();
        var description = $('#activity').val();
        var place = $('#place').val();
        var type = $('#type').val();
        var notes = $('#TxtArea').val();
        var flagColor = $('#color').val();
        var availability = $('#busy').is(':checked'); 



        // Create a new row
        var newRow = `
            <tr>
                <td>${date}</td>
                <td>${start}</td>
                <td>${end}</td>
                <td>${description}</td>
                <td>${place}</td>
                <td>${type}</td>
                <td>${notes}</td>
                <td style="background-color: ${flagColor};"></td>
                <td>${availability ? '<img src="Icons/busy.png" alt="Not Available" id="IconPhoto">' : '<img src="Icons/free.png" alt="Available" id="IconPhoto">'}</td>
        </tr>
        `;

        // Append the new row to the table
        $('#scheduleTable tbody').append(newRow);

    
    });

    $('#addTest').click(function(){

        var date = "1";
        var start = "2";
        var end = "3";
        var description = "4";
        var place = "5";
        var type = "6";
        var notes = "7";
        var flagColor = "8";
        var availability = "9";

        var insertar = `<tr>
                <td>${date}</td>
                <td>${start}</td>
                <td>${end}</td>
                <td>${description}</td>
                <td>${place}</td>
                <td>${type}</td>
                <td>${notes}</td>
                <td>${flagColor}</td>
                <td>${availability}</td>
            </tr>`;

        $('#tablaPrueba tbody').append(insertar);
    });
});
