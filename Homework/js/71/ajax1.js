async function loadFile(filename) {
    $('#spinner').show();
    $('#messageBox').hide();
    $('#content').empty();

    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }

        const text = await response.text();

        // Simulate delay for spinner visibility (optional)
        await new Promise(resolve => setTimeout(resolve, 500));

        $('#content').text(text);
    } catch (err) {
        $('#messageBox').text(`Error: ${err.message}`).css('color', 'red').show();
    } finally {
        $('#spinner').hide();
    }
}

$(document).ready(function () {
    $('#loadBtn').click(function () {
        const filename = $('#filename').val().trim();
        if (filename) {
            loadFile(filename);
        } else {
            $('#messageBox').text('Please enter a filename.').css('color', 'orange').show();
        }
    });
});