update public.products set file_url=null where slug='clarity-attracts-book' and file_url='https://theneostrategy.com/tmp-test-asset.pdf';
delete from public.orders where customer_name='Test Buyer' and email='test.buyer@example.com';
delete from public.leads where email='test.buyer@example.com' and source='shop_order';