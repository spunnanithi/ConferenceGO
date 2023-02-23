function createCard(name, description, pictureUrl, created_date, end_date, location) {
    return `
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
        </div>
        <div class="card-footer text-center">
            ${created_date} - ${end_date}
        </div>
    </div>
    `;
}

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

            let count = 0
            for (let conference of data.conferences) {

                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);

                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    console.log(details)
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;

                    let created_date = new Date(details.conference.created);
                    created_date = created_date.toDateString();

                    let end_date = new Date(details.conference.ends);
                    end_date = end_date.toDateString();

                    const location = details.conference.location.name;

                    const html = createCard(title, description, pictureUrl, created_date, end_date, location);

                    const columns = document.querySelectorAll('.col'); // ['.col', '.col', '.col']

                    const column = columns[count];
                    column.innerHTML += html;
                    count++;
                    if (count === 3) {
                        count = 0;
                    }

                }
            }

        }
    } catch (e) {

        // Figure out what to do if an error is raised
        console.error(e);

    }
});
