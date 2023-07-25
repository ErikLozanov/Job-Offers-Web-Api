import {html} from "../../node_modules/lit-html/lit-html.js";
import { getAllJobs } from "../api/data.js";
import { jobPreview } from "./common.js";
let dashboardTemplate = (jobs) => html`
        <section id="dashboard">
          <h2>Job Offers</h2>

          <!-- Display a div with information about every post (if any)-->
          ${jobs.length == 0 ? html`<h2>No offers yet.</h2>` :
            html`${jobs.map(jobPreview)}`}

          <!-- Display an h2 if there are no posts -->
          
        </section>
`;

export async function dashboardPage(ctx){
    const jobs = await getAllJobs();
    ctx.render(dashboardTemplate(jobs));
}