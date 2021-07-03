async function newComment(event) {
    event.preventDefault();

    const comment = document.querySelector('#new-comment').value.trim();

    const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({
        comment
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/post');
    } else {
        alert('Your comment did not post ☹︎');
    }
}

document.querySelector('#add-new-comment').addEventListener('click', newComment);