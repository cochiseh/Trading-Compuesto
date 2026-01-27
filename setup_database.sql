-- 1. Crear la tabla para almacenar los datos del usuario
create table if not exists public.user_data (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  content jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Habilitar Row Level Security (RLS)
alter table public.user_data enable row level security;

-- 3. Crear política para que los usuarios puedan VER sus propios datos
create policy "Users can view their own data" 
on public.user_data for select 
using (auth.uid() = user_id);

-- 4. Crear política para que los usuarios puedan INSERTAR sus propios datos
create policy "Users can insert their own data" 
on public.user_data for insert 
with check (auth.uid() = user_id);

-- 5. Crear política para que los usuarios puedan ACTUALIZAR sus propios datos
create policy "Users can update their own data" 
on public.user_data for update 
using (auth.uid() = user_id);

-- 6. Crear política para que los usuarios puedan BORRAR sus propios datos
create policy "Users can delete their own data" 
on public.user_data for delete 
using (auth.uid() = user_id);

-- 7. (Opcional) Crear un índice para mejorar la velocidad
create index if not exists user_data_user_id_idx on public.user_data (user_id);
