/**
 * Zarządzanie usuwaniem
 * TODO dodac osobne klasy do budowy calosci
 * TOTO Aktualizacja 
 */
class ManageCategories {
    homePage = window.location.origin;

    constructor() {
        this.initEventListeners();
    }
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
        const {id,name} = event.currentTarget.dataset;
        //document.getElementsByTagName('form').getAttribute('data-edit-action');
        const dataEditAction = document.querySelector('form').dataset.editAction;
        document.querySelector('form').action = dataEditAction;
        document.querySelector('input[name="id"]').value = id;
        document.getElementById('name').value = name;
        document.querySelector('.js-add-edit').value = 'Edit category';

        const options = document.getElementById('parent_id').options;
        
    }

    /**
     * AJAX do usuwania categorii
     * @param id
     * @returns {Promise<any>}
     */
    removeEl = async id =>{
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
