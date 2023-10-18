function resizeAndSpaceObjects() {
    var doc = app.activeDocument;
    var selectedItems = doc.selection;

    // Check if anything is selected
    if (selectedItems.length === 0) {
        alert("Please select the objects you want to resize.");
        return;
    }

    // Create a dialog for user input
    var dialog = new Window('dialog', 'Resize and Space Objects');
    dialog.orientation = 'column';
    dialog.alignChildren = ['fill', 'top'];
    dialog.spacing = 10;
    dialog.margins = 16;

    // Total width input
    var totalWidthGroup = dialog.add('group', undefined, {name: 'totalWidthGroup'});
    totalWidthGroup.add('statictext', undefined, 'Total Width:');
    var totalWidthInput = totalWidthGroup.add('edittext', undefined, '170');
    totalWidthInput.characters = 5;
    totalWidthInput.active = true;

    // Spacing input
    var spacingGroup = dialog.add('group', undefined, {name: 'spacingGroup'});
    spacingGroup.add('statictext', undefined, 'Spacing:');
    var spacingInput = spacingGroup.add('edittext', undefined, '0.5');
    spacingInput.characters = 5;

    // Add OK and Cancel buttons
    var buttonsGroup = dialog.add('group', undefined, {name: 'buttonsGroup'});
    buttonsGroup.orientation = 'row';
    buttonsGroup.alignChildren = ['fill', 'top'];
    buttonsGroup.spacing = 10;
    buttonsGroup.margins = 0;
    var okButton = buttonsGroup.add('button', undefined, 'OK');
    var cancelButton = buttonsGroup.add('button', undefined, 'Cancel');

    okButton.onClick = function() {
        // Get user input values
        var totalWidth = parseFloat(totalWidthInput.text);
        var spacing = parseFloat(spacingInput.text);

        // Validate user input
        if (isNaN(totalWidth) || isNaN(spacing)) {
            alert("Please enter valid numbers for width and spacing.");
            return;
        }

        // Close the dialog
        dialog.close();

        // Calculate total original width
        var totalOriginalWidth = 0;
        for (var i = 0; i < selectedItems.length; i++) {
            totalOriginalWidth += selectedItems[i].width;
        }

        // Calculate scaling factor
        var x = (totalWidth - (selectedItems.length - 1) * spacing) / totalOriginalWidth;

        // Calculate and set the new widths and arrange them
        var xPos = selectedItems[0].position[0]; // Starting X position
        for (var i = 0; i < selectedItems.length; i++) {
            var item = selectedItems[i];

            // Resize the item
            item.resize(x * 100, x * 100, true, true, true, true, x * 100);

            // Set the position
            item.position = [xPos, item.position[1]];

            // Update the X position for the next item
            xPos += item.width + spacing;
        }

        alert("Objects resized and spaced!");
    };

    cancelButton.onClick = function() {
        dialog.close();
    };

    dialog.show();
}

resizeAndSpaceObjects();
