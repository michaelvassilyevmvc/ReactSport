import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Person } from '../models/person';

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

    loadPerson = async (id: string) => {
        let person = this.getPerson(id);
        if (person) {
            this.selectedPerson = person;
            return person;
        }
        else {
            this.loadingInitial = true;
            try {
                person = await agent.Persons.details(id);
                this.setPerson(person);
                runInAction(() => {
                    this.selectedPerson = person;
                })
                this.setLoadingInitial(false);
                return person;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPerson = (person: Person) => {
        person.doB = person.doB.split('T')[0];
        this.personRegistry.set(person.id, person);
    }

    private getPerson = (id: string) => {
        return this.personRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => { this.loadingInitial = state; }

    cancelSelectedPerson = () => { this.selectedPerson = undefined; }

    loadPersons = async () => {
        this.loadingInitial = true;
        try {
            this.persons = await agent.Persons.list();

            this.persons.forEach((person) => {
                this.setPerson(person);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    createPerson = async (person: Person) => {
        this.loading = true;

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
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false; })
        }
    }



}