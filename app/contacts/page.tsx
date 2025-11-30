"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DashboardCard from "@/components/DashboardCard";

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Mom", phone: "+91 98765 43210", relation: "Mother" },
    { id: 2, name: "Dad", phone: "+91 98765 43211", relation: "Father" },
    { id: 3, name: "Best Friend", phone: "+91 98765 43212", relation: "Friend" },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  const handleAdd = (contact: { name: string; phone: string; relation: string }) => {
    const newContact = { id: Date.now(), ...contact };
    setContacts([...contacts, newContact]);
  };

  const handleEdit = (contact: { name: string; phone: string; relation: string }) => {
    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id ? { ...editingContact, ...contact } : c
        )
      );
      setEditingContact(null);
    }
  };

  const handleDelete = () => {
    if (deletingContact) {
      setContacts(contacts.filter((c) => c.id !== deletingContact.id));
      setDeletingContact(null);
      setDeleteDialogOpen(false);
    }
  };

  const openEditForm = (contact: Contact) => {
    setEditingContact(contact);
    setFormOpen(true);
  };

  const openDeleteDialog = (contact: Contact) => {
    setDeletingContact(contact);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Emergency <span className="gradient-text">Contacts</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your trusted contacts who will be notified in emergencies
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingContact(null);
                setFormOpen(true);
              }}
              className="bg-linear-to-r from-primary to-accent hover:opacity-90 transition-smooth"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>

          {/* Contacts List */}
          <DashboardCard
            title={`Your Contacts (${contacts.length})`}
            description="These people will be notified when you trigger an SOS alert"
          >
            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No emergency contacts added yet</p>
                <Button
                  onClick={() => setFormOpen(true)}
                  variant="outline"
                >
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
                        />
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.relation}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <a
                            href={`tel:${contact.phone}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditForm(contact)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => openDeleteDialog(contact)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DashboardCard>

          {/* Info Card */}
          <div className="mt-6 p-6 rounded-lg glass border border-primary/20">
            <h3 className="font-semibold mb-2">Important Information</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• All contacts will receive an SMS with your location when SOS is triggered</li>
              <li>• We recommend adding at least 3 trusted emergency contacts</li>
              <li>• Contacts can be family members, friends, or trusted guardians</li>
              <li>• Make sure phone numbers are active and can receive SMS</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form Dialog */}
      <ContactForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingContact(null);
        }}
        onSubmit={editingContact ? handleEdit : handleAdd}
        initialData={
          editingContact
            ? {
                name: editingContact.name,
                phone: editingContact.phone,
                relation: editingContact.relation,
              }
            : undefined
        }
        mode={editingContact ? "edit" : "add"}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="glass">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {deletingContact?.name} from your emergency contacts?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
