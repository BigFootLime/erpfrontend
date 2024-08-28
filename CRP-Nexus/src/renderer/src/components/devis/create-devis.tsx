import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../ui/FormInput"; // Assurez-vous que ce composant est bien défini
import FormTextArea from "../ui/FormTextArea"; // Ajoutez ce composant pour les champs texte plus longs
import FormSelect from "../ui/FormSelect"; // Ajoutez ce composant pour les listes déroulantes

export default function CreateDevisForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      client_id: "", // Vous devrez récupérer cette valeur depuis une liste de clients
      date_creation: new Date().toISOString().split("T")[0], // Par défaut aujourd'hui
      statut: "En cours", // Statut par défaut
      taux_tva: 20.0, // Valeur par défaut de la TVA
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Traitement du formulaire ici
  };
  const clientOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" },
  ];

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-neutral-100 w-full h-full rounded-lg p-6 sm:p-8 md:p-10"
      >
        <div className="mb-4">
          <FormSelect
            label="Client"
            name="client_id"
            placeholder="Selectionner un client"
            options={clientOptions}
            register={register}
            validation={{ required: "Vueillez selectionner un client" }}
            error={errors.client_id}
            light={true} // Example usage of the 'light' prop
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Date de création"
            name="date_creation"
            type="date"
            register={register}
            validation={{ required: "Ce champ est requis" }}
            error={errors.date_creation}
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Date de validité"
            name="date_validite"
            type="date"
            register={register}
            error={errors.date_validite}
          />
        </div>

        <div className="mb-4">
          <FormSelect
            light={true}
            label="Statut"
            name="statut"
            options={[
              { value: "En cours", label: "En cours" },
              { value: "Validé", label: "Validé" },
              { value: "Annulé", label: "Annulé" },
            ]}
            register={register}
            validation={{ required: "Ce champ est requis" }}
            error={errors.statut}
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Total HT"
            name="total_ht"
            type="number"
            step="0.01"
            register={register}
            validation={{ required: "Ce champ est requis" }}
            error={errors.total_ht}
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Total TTC"
            name="total_ttc"
            type="number"
            step="0.01"
            register={register}
            validation={{ required: "Ce champ est requis" }}
            error={errors.total_ttc}
          />
        </div>

        <div className="mb-4">
          <FormTextArea
            light={true}
            label="Conditions de paiement"
            name="conditions_paiement"
            register={register}
            error={errors.conditions_paiement}
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Délai de livraison"
            name="delai_livraison"
            type="date"
            register={register}
            error={errors.delai_livraison}
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Interlocuteur"
            name="interlocuteur"
            type="text"
            register={register}
            validation={{ required: "Ce champ est requis" }}
            error={errors.interlocuteur}
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Taux TVA (%)"
            name="taux_tva"
            type="number"
            step="0.01"
            register={register}
            validation={{ required: "Ce champ est requis" }}
            error={errors.taux_tva}
          />
        </div>

        <div className="mb-4">
          <FormInput
            light={true}
            label="Remise (€)"
            name="remise"
            type="number"
            step="0.01"
            register={register}
            error={errors.remise}
          />
        </div>

        <div className="mb-4">
          <FormTextArea
            light={true}
            label="Conditions spéciales"
            name="conditions_speciales"
            register={register}
            error={errors.conditions_speciales}
          />
        </div>

        <div className="mb-4">
          <FormTextArea
            light={true}
            label="Remarques"
            name="remarques"
            register={register}
            error={errors.remarques}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Enregistrer le devis
          </button>
        </div>
      </form>
    </div>
  );
}
