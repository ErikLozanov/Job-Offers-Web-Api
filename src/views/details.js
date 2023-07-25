import {html} from "../../node_modules/lit-html/lit-html.js";
import { applyJob, deleteJob, getAppliesByJobId, getJobById, getMyAppliesByJobId } from "../api/data.js";
import {getUserData} from "../util.js";

let detailsTemplate = (job,isOwner,onDelete,applies,showApplyBtn, onApply) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${job.imageUrl}" alt="example1" />
            <p id="details-title">${job.title}</p>
            <p id="details-category">
              Category: <span id="categories">${job.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${job.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${job.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${job.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${applies}</strong></p>
            <div id="action-buttons">
            <!--Edit and Delete are only for creator-->
            ${jobControlsTemplate(job,isOwner,onDelete)}
              <!--Bonus - Only for logged-in users ( not authors )-->
              ${appliesControlsTemplate(showApplyBtn,onApply)}
            </div>
          </div>
        </section>
`;

let jobControlsTemplate = (job,isOwner,onDelete) => {
    if(isOwner) {
        return html `
        <a href="/edit/${job._id}" id="edit-btn">Edit</a>
        <a href="#" @click=${onDelete} id="delete-btn">Delete</a>`;
    } else {
        return null;
    }
}


let appliesControlsTemplate = (showApplyBtn, onApply) => {
    if(showApplyBtn) {
        return html`<a @click=${onApply} href="" id="apply-btn">Apply</a>`
    } else {
        return null;
    }
}

export async function detailsPage(ctx) {
    let userData = getUserData();

    let [job, applies, hasApply] = await Promise.all([
        getJobById(ctx.params.id),
        getAppliesByJobId(ctx.params.id),
        userData ? getMyAppliesByJobId (ctx.params.id, userData.id) : 0
    ])

    let isOwner = userData && userData.id == job._ownerId;
    let showApplyBtn = isOwner == false && hasApply == false && userData !== null;
    ctx.render(detailsTemplate(job,isOwner,onDelete, applies, showApplyBtn,onApply));

    async function onDelete() {
        await deleteJob(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }

    async function onApply() {
        await applyJob(ctx.params.id);
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
}


