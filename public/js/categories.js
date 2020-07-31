/**
 * Zarządzanie usuwaniem
 * TODO dodac osobne klasy do budowy calosci
 */
class ManageCategories {
    homePage = window.location.origin;

    constructor() {
        this.initEventListeners();
    }

    initEventListeners = () => {
        let removeEls = document.querySelectorAll('.js-remove-el');
        Array.from(removeEls).forEach(el => {
            el.addEventListener('click', this.handleRemoveEvent);
        });
    };
    /**
     * obsluga wywoływanego eventu
     * @param event
     */
     handleRemoveEvent = event => {
        const id = event.currentTarget.id;
        if(id){
            this.removeEl(id)
                .then(this.handleRemoveResponse)
                .catch(error => alert(error));
        }
    };
    /**
     * Obsluga usuwania wezłów
     * @param data
     */
     handleRemoveResponse = data =>{
         const response = JSON.parse(data);
         switch(response.status){
             case 'SUCCESS':
                 //TODO usuwanie wezła
                 break;
         }
     };
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
