create policy "Staff read product files"
on storage.objects for select to authenticated
using (bucket_id = 'product-files' and private.is_staff(auth.uid()));

create policy "Staff upload product files"
on storage.objects for insert to authenticated
with check (bucket_id = 'product-files' and private.is_staff(auth.uid()));

create policy "Staff update product files"
on storage.objects for update to authenticated
using (bucket_id = 'product-files' and private.is_staff(auth.uid()))
with check (bucket_id = 'product-files' and private.is_staff(auth.uid()));

create policy "Staff delete product files"
on storage.objects for delete to authenticated
using (bucket_id = 'product-files' and private.is_staff(auth.uid()));