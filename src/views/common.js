import {html} from "../../node_modules/lit-html/lit-html.js";


export const jobPreview = (job) => html`
<div class="offer">
            <img src="${job.imageUrl}" alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${job.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
            <a class="details-btn" href="/details/${job._id}">Details</a>
          </div>
`