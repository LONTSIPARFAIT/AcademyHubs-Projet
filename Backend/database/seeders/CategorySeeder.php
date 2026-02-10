<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Développement Web',
            'Design Graphique',
            'Marketing Digital',
            'Data Science',
            'Business & Entreprenariat'
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
                'slug' => Str::slug($category), // Génère un slug à partir du nom (ex: "Développement Web" => "developpement-web")
                'icon' => 'default-icon', // je peux ajouter des icônes plus tard
            ]);
        }
    }
}
