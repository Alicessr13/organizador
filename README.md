# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

--tabela habitos
create table public.habits (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    title text not null,
    subtitle text,
    streak text,
    completed_dates jsonb default '[]'::jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Segurança (RLS)
alter table public.habits enable row level security;

-- Criar permissões para o seu usuário
create policy "Users can view their own habits." on habits for select using ( auth.uid() = user_id );
create policy "Users can insert their own habits." on habits for insert with check ( auth.uid() = user_id );
create policy "Users can update their own habits." on habits for update using ( auth.uid() = user_id );
create policy "Users can delete their own habits." on habits for delete using ( auth.uid() = user_id );
