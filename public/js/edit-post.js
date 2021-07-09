async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
    // need to get time of submit for 'updated at'

    const response = await fetch('/post', {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        })
    });

    if (response.ok) {
        document.location.replace('/dashbaord');
    } else {
        alert('Update failed. Please try again.');
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);