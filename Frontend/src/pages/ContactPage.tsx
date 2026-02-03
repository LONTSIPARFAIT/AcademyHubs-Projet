import React, { useState } from 'react';
import { Input, Textarea, Button, Card, CardHeader, CardTitle, CardContent } from '../components/ui';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
    console.log('Formulaire soumis:', formData);
    alert('Message envoyé ! (Simulation)');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contactez-nous</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Envoyez-nous un message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nom complet"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom complet"
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
              />

              <Input
                label="Sujet"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Sujet de votre message"
                required
              />

              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                rows={5}
                required
              />

              <Button type="submit" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Email :</strong> contact@academyhubs.com</p>
              <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
              <p><strong>Adresse :</strong> 123 Rue de l'Éducation, 75001 Paris, France</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;