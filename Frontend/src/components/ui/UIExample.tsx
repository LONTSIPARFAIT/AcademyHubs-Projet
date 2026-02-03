import React, { useState } from 'react';
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Modal
} from './index';

const UIComponentsExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: '',
    agree: false,
    newsletter: false,
    contact: 'email'
  });

  const selectOptions = [
    { value: 'general', label: 'Question générale' },
    { value: 'technical', label: 'Support technique' },
    { value: 'billing', label: 'Facturation' },
    { value: 'feedback', label: 'Commentaires' }
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name || 'category']: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Composants UI AcademyHubs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bibliothèque de composants réutilisables et uniformes
        </p>
      </div>

      {/* Boutons */}
      <Card>
        <CardHeader>
          <CardTitle>Boutons (Button)</CardTitle>
          <CardDescription>
            Différentes variantes et tailles de boutons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primaire</Button>
            <Button variant="secondary">Secondaire</Button>
            <Button variant="outline">Contour</Button>
            <Button variant="ghost">Fantôme</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="sm">Petit</Button>
            <Button size="md">Moyen</Button>
            <Button size="lg">Grand</Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button isLoading>Loading</Button>
            <Button leftIcon={<span>🔍</span>}>Rechercher</Button>
            <Button rightIcon={<span>→</span>}>Suivant</Button>
            <Button fullWidth>Plein largeur</Button>
          </div>
        </CardContent>
      </Card>

      {/* Champs de formulaire */}
      <Card>
        <CardHeader>
          <CardTitle>Champs de formulaire</CardTitle>
          <CardDescription>
            Inputs, textarea, select avec validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Nom complet"
              placeholder="Votre nom"
              name="name"
              value={formData.name}
              onChange={handleTextChange}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              leftIcon={<span>📧</span>}
              name="email"
              value={formData.email}
              onChange={handleTextChange}
              error={!formData.email.includes('@') && formData.email ? 'Email invalide' : undefined}
            />
          </div>

          <Select
            label="Catégorie"
            placeholder="Choisissez une catégorie"
            options={selectOptions}
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
          />

          <Textarea
            label="Message"
            placeholder="Votre message..."
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleTextChange}
            helperText="Décrivez votre demande en détail"
          />
        </CardContent>
      </Card>

      {/* Cases à cocher et boutons radio */}
      <Card>
        <CardHeader>
          <CardTitle>Cases à cocher et boutons radio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Checkbox
              label="J'accepte les conditions générales d'utilisation"
              name="agree"
              checked={formData.agree}
              onChange={handleCheckboxChange}
            />

            <Checkbox
              label="Je souhaite recevoir la newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Mode de contact préféré</Label>
            <div className="space-y-2">
              <Radio
                label="Par email"
                name="contact"
                value="email"
                checked={formData.contact === 'email'}
                onChange={handleRadioChange}
              />
              <Radio
                label="Par téléphone"
                name="contact"
                value="phone"
                checked={formData.contact === 'phone'}
                onChange={handleRadioChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>
            Pour tags, statuts et indicateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Défaut</Badge>
            <Badge variant="primary">Primaire</Badge>
            <Badge variant="secondary">Secondaire</Badge>
            <Badge variant="success">Succès</Badge>
            <Badge variant="warning">Avertissement</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge size="sm">Petit</Badge>
            <Badge size="md">Moyen</Badge>
            <Badge size="lg">Grand</Badge>
            <Badge rounded>Arrondi</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Card>
        <CardHeader>
          <CardTitle>Modal</CardTitle>
          <CardDescription>
            Dialogues et fenêtres modales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsModalOpen(true)}>
            Ouvrir la modal
          </Button>
        </CardContent>
      </Card>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Exemple de modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Ceci est un exemple de modal avec du contenu. Vous pouvez y placer
            n'importe quel contenu React.
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Confirmer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UIComponentsExample;