$(document).ready(function () {
    $('#addRow').click(function () {
        // Get form values
        var date = $('#date').val();
        var start = $('#start').val();
        var end = $('#end').val();
        var description = $('#description').val();
        var place = $('#place').val();
        var type = $('#type').val();
        var notes = $('#notes').val();
        var flagColor = $('#color').val();
        var availability = $('#availability').val();

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
                <td>${availability === 'Busy' ? '<img src="Icons/busy.png" alt="Not Available" id="IconPhoto">' : '<img src="Icons/free.png" alt="Available" id="IconPhoto">'}</td>
            </tr>
        `;

        // Append the new row to the table
        $('#agendaTable tbody').append(newRow);

        // Optionally, clear the input fields after adding the row
        $('#insertForm')[0].reset();
    });
});
