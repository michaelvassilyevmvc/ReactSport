import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Person } from '../models/person';
import { v4 as uuid } from 'uuid';

export default class PersonStore {
    persons: Person[] = [];
    personRegistry = new Map<string, Person>();
    selectedPerson: Person | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get personsByDate() {
        return Array.from(this.personRegistry.values()).sort((a, b) => Date.parse(a.doB) - Date.parse(b.doB));
    }

    setLoadingInitial = (state: boolean) => { this.loadingInitial = state; }

    selectPerson = (id: string) => { this.selectedPerson = this.personRegistry.get(id); }

    cancelSelectedPerson = () => { this.selectedPerson = undefined; }

    loadPersons = async () => {
        try {
            this.persons = await agent.Persons.list();

            this.persons.forEach((person) => {
                person.doB = person.doB.split("T")[0];
                this.personRegistry.set(person.id, person);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    openForm = (id?: string) => {
        id ? this.selectPerson(id) : this.cancelSelectedPerson();
        this.editMode = true;
    }

    closeForm = () => { this.editMode = false; }

    createPerson = async (person: Person) => {
        this.loading = true;
        person.id = uuid();

        try {
            await agent.Persons.create(person);
            runInAction(() => {
                this.personRegistry.set(person.id, person);
                this.selectedPerson = person;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false; })
        }
    }

    updatePerson = async (person: Person) => {
        this.loading = true;
        try {
            await agent.Persons.update(person);
            runInAction(() => {
                this.personRegistry.set(person.id, person);
                this.selectedPerson = person;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePerson = async (id: string) => {
        this.loading = true;
        try {
            await agent.Persons.delete(id);
            runInAction(() => {
                this.personRegistry.delete(id);
                if (this.selectedPerson?.id === id) this.cancelSelectedPerson();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false; })
        }
    }



}