import Sortable from 'sortablejs';

/**
 * Zarządzanie usuwaniem
 *
 */
class ManageCategories {
    homePage = window.location.origin;
    sortableOptions = {
        group: {
            name: "sortable-list",
            pull: true,
            put: true,
        },
        animation: 250,
        forceFallback: true,
        store: {
            set: async function (sortable) {
                var order = sortable.toArray();
                let response = await fetch(`${window.location.origin}/change_sort/`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-Token": document.querySelector('input[name="_token"]').value
                    },
                    method: "POST",
                    credentials: "same-origin",
                    body: JSON.stringify({
                        order: order
                    })
                })
                    .catch(error => alert(error));

                await response.json().then(data => {
                    document.getElementById('parent_id').outerHTML = data.html;
                });

            }
        },
        onEnd: async (event) => {
            //id do
            const id_to = event.to.dataset.id;
            const id_from = event.item.dataset.id;
            let response = await fetch(`${window.location.origin}/change_position/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": document.querySelector('input[name="_token"]').value
                },
                method: "POST",
                credentials: "same-origin",
                body: JSON.stringify({
                    from_id: id_from,
                    to_id: id_to
                })
            })
                .catch(error => alert(error));

            await response.json().then(data => {
                document.getElementById('parent_id').outerHTML = data.html;
            });
        }
    };

    constructor() {
        this.initEventListeners();
        this.initSortable();
    }

    /**
     * Obsługa zmiany sortowania
     */
    handleSortable = () => {
        console.log('test');
    };

    /**
     * inicjliazjacja biblioteki sortable
     */
    initSortable = () => {
        let els = document.querySelectorAll('.js-sortable');
        for (let i = 0; i < els.length; i++) {
            new Sortable(els[i], this.sortableOptions);
        }
    };
    /**
     * Inicjalizacja nasluchiwania zdarzeń
     */
    initEventListeners = () => {
        let removeEls = document.querySelectorAll('.js-remove-el');
        let editEls = document.querySelectorAll('.js-edit-el');
        let slideEls = document.querySelectorAll('.js-slide-el');

        Array.from(removeEls).forEach(el => {
            el.addEventListener('click', this.handleRemoveEvent);
        });

        Array.from(editEls).forEach(el => {
            el.addEventListener('click', this.handleEdit);
        });
        Array.from(slideEls).forEach(el => {
            el.addEventListener('click', this.slidetoggle);
        });

        document.querySelector('.js-change-addform').addEventListener('click', this.changeToAddForm);
        document.querySelector('.js-show-all').addEventListener('click', this.showAllCategories);
    };
    /**
     * pokaz wszystkie kategorie
     * @param event
     */
    showAllCategories = event => {
        let slideEls = document.querySelectorAll('.js-sortable');
        let imgsEls = document.querySelectorAll('.js-slide-el img');
        Array.from(slideEls).forEach(el => {
            el.style.display = 'block'
        });
        Array.from(imgsEls).forEach(el => {
            el.className = 'rotate';
        });

    };
    /**
     * toogle pokazywania categorii
     * @param event
     */
    slidetoggle = event => {
        const id = event.currentTarget.dataset.id;
        event.target.classList.toggle("rotate");
        //  document.querySelector(event.currentTarget.class).classList.toggle('hidden-phone');
        let el = document.querySelector(`.js-sortable[data-id="${id}"]`);

        if (el.style.display === "none") {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    };
    /**
     * zmien form na dodawanie categorii
     * @param event
     */
    changeToAddForm = event => {
        let action = document.querySelector('#category').action;

        document.querySelector('#category').action = document.querySelector('#category').dataset.editAction;
        document.querySelector('#category').dataset.editAction = action;
        document.querySelector('input[name="id"]').value = '';
        document.getElementById('name').value = '';
        document.querySelector('.js-label').innerHTML = `Category name:`;
        document.querySelector('.js-add-edit').value = 'Add new';
        document.getElementById('parent_id').value = 0;
        document.querySelector('.js-change-addform').style.display = 'none';
    };

    /**
     * obsluga wywoływanego eventu
     * @param event
     */
    handleRemoveEvent = event => {
        const id = event.currentTarget.dataset.id;

        if (id) {
            if (window.confirm("Do you really want to delete that category?")) {
                this.removeEl(id)
                    .then(data => {
                        data.success && document.querySelector(`.js-remove-el[data-id="${id}"]`).parentNode.remove()
                        document.getElementById('parent_id').outerHTML = data.html;

                    })
                    .catch(error => console.log(error));

            }
        }
    };
    /**
     * Zmiana formularza na edycję
     */
    handleEdit = event => {
        const {id, name, parent_id} = event.currentTarget.dataset;
        let action = document.querySelector('#category').action;
        document.querySelector('#category').action = document.querySelector('#category').dataset.editAction;
        document.querySelector('#category').dataset.editAction = action;
        document.querySelector('input[name="id"]').value = id;
        document.querySelector('.js-label').innerHTML = `Editing category: ${name}`;
        document.getElementById('name').value = name;
        document.querySelector('.js-add-edit').value = 'Edit category';

        if (parent_id !== '') {
            document.getElementById('parent_id').value = parent_id;
        } else {
            document.getElementById('parent_id').value = 0;
        }
        document.querySelector('.js-change-addform').style.display = 'block';
    }

    /**
     * AJAX do usuwania categorii
     * @param id
     * @returns {Promise<any>}
     */
    removeEl = async id => {
        let response = await fetch(`${this.homePage}/remove_category/`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('input[name="_token"]').value
            },
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({id: id})
        })
            .catch(error => alert(error));

        return await response.json();
    };

}

const app = new ManageCategories();
