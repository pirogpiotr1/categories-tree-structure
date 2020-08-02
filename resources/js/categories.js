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
        store:{
            set: async function (sortable) {
                var order = sortable.toArray();
                let response = await fetch(`${window.location.origin}/change_sort/`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-Token":  document.querySelector('input[name="_token"]').value
                    },
                    method: "POST",
                    credentials: "same-origin",
                    body: JSON.stringify({
                        order: order
                    })
                })
                    .catch(error => alert(error));
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
                    "X-CSRF-Token":  document.querySelector('input[name="_token"]').value
                },
                method: "POST",
                credentials: "same-origin",
                body: JSON.stringify({
                    from_id: id_from,
                    to_id:id_to
                })
            })
            .catch(error => alert(error));
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

    initSortable  = () => {


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

        Array.from(removeEls).forEach(el => {
            el.addEventListener('click', this.handleRemoveEvent);
        });

        Array.from(editEls).forEach(el => {
            el.addEventListener('click', this.handleEdit);
        });

        document.querySelector('.js-change-addform').addEventListener('click', this.changeToAddForm);
    };
    /**
     * zmien form na dodawanie categorii
     * @param event
     */
    changeToAddForm = event => {
        let action = document.querySelector('form').action;

        document.querySelector('form').action = document.querySelector('form').dataset.editAction;
        document.querySelector('form').dataset.editAction = action;
        document.querySelector('input[name="id"]').value = '';
        document.getElementById('name').value = '';
        document.querySelector('.js-add-edit').value = 'Add new';
        document.getElementById('parent_id').value = 0;
        document.querySelector('.js-change-addform').style.display  = 'none';
    };

    /**
     * obsluga wywoływanego eventu
     * @param event
     */
    handleRemoveEvent = event => {
        const id = event.currentTarget.dataset.id;

        if(id){
            this.removeEl(id)
                .then(data => { data.success && document.querySelector(`.js-remove-el[data-id="${id}"]`).parentNode.remove() })
                .catch(error => console.log(error));
        }
    };
    /**
     * Zmiana formularza na edycję
     */
    handleEdit = event => {
        const {id,name,parent_id} = event.currentTarget.dataset;
        let action = document.querySelector('form').action;

        document.querySelector('form').action = document.querySelector('form').dataset.editAction;
        document.querySelector('form').dataset.editAction = action;
        document.querySelector('input[name="id"]').value = id;
        document.getElementById('name').value = name;
        document.querySelector('.js-add-edit').value = 'Edit category';

        if(parent_id !== ''){
            document.getElementById('parent_id').value = parent_id;
        }else{
            document.getElementById('parent_id').value = 0;
        }
        document.querySelector('.js-change-addform').style.display  = 'block';

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
                "X-CSRF-Token":  document.querySelector('input[name="_token"]').value
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
