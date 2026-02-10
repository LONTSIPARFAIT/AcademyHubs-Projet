<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            // RELATION CATEGORIE : 
            // foreignId crée la colonne 'category_id'. 
            // constrained() dit à Laravel : "Vérifie que cette catégorie existe vraiment".
            $table->foreignId('category_id')->constrained()->onDelete('cascade');

            // RELATION ENSEIGNANT : 
            // On lie à la table 'users'. On appelle la colonne 'instructor_id' 
            // mais on précise qu'elle pointe vers la table 'users'.
            $table->foreignId('instructor_id')->constrained('users')->onDelete('cascade');

            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('thumbnail')->nullable(); // Image de couverture
            $table->boolean('is_published')->default(false); // Pour le mode brouillon
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
