// Since we are using 'await' keyword, we need to write 'async' keyword next to function declaration
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        // Fetch returns a Promise object so we need to use 'await' keyword
        const response = await fetch(url);

        if (!response.ok) {

            // Figure out what to do when the response is bad
            console.log("The response is bad.");

        } else {

            // response.json() returns a Promise object so we need 'await' keyword
            const data = await response.json();

            const conference = data.conferences[0];
            const nameTag = document.querySelector('.card-title');
            nameTag.innerHTML = conference.name;

            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                console.log(details);

                const descriptionTag = document.querySelector('.card-text');
                descriptionTag.innerHTML = details.conference.description;

                const imageTag = document.querySelector('.card-img-top');
                imageTag.src = details.conference.location.picture_url;
            }

        }
    } catch (e) {

        // Figure out what to do if an error is raised
        console.error(e);

    }
});
