import {html} from "../../node_modules/lit-html/lit-html.js";
import { editJobById, getJobById } from "../api/data.js";


let editTemplate = (job) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                value="${job.title}"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                value="${job.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                value="${job.category}"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              >${job.description}</textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              >${job.requirements}</textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                value="${job.salary}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

let ctxClone = null;


export async function editPage(ctx) {
    let job = await getJobById(ctx.params.id);
    ctxClone = ctx;
    ctx.render(editTemplate(job));
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title').trim()
    let imageUrl = formData.get('imageUrl').trim()
    let category = formData.get('category').trim()
    let description = formData.get('description').trim()
    let requirements = formData.get('requirements').trim()
    let salary = formData.get('salary').trim()


    if(title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
        return alert('Please fill in all inputs!');
    }

    await editJobById(ctxClone.params.id,({title,imageUrl,category,description,requirements,salary}));
    ctxClone.page.redirect(`/details/${ctxClone.params.id}`)
}