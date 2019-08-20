CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `orders`.`itemdetails` AS select `orders`.`items`.`i_name` AS `name`,(select `orders`.`dists`.`d_name` from `orders`.`dists` where (`orders`.`dists`.`d_id` = `orders`.`items`.`i_dist`)) AS `dist`,(select `orders`.`item_types`.`it_name` from `orders`.`item_types` where (`orders`.`item_types`.`it_id` = `orders`.`items`.`i_type`)) AS `type`,`orders`.`items`.`i_par` AS `par`,(select `orders`.`order_units`.`ou_name` from `orders`.`order_units` where (`orders`.`order_units`.`ou_id` = `orders`.`items`.`d_order_type`)) AS `order_unit`,(select `orders`.`unit_quantity`.`uq_name` from `orders`.`unit_quantity` where (`orders`.`unit_quantity`.`uq_id` = `orders`.`items`.`d_order_quantity`)) AS `order_quantity`,`orders`.`items`.`default_order` AS `default_num`,`orders`.`items`.`on_hand` AS `on_hand` from ((((`orders`.`items` join `orders`.`dists` on((`orders`.`dists`.`d_id` = `orders`.`items`.`i_dist`))) join `orders`.`item_types` on((`orders`.`item_types`.`it_id` = `orders`.`items`.`i_type`))) join `orders`.`order_units` on((`orders`.`order_units`.`ou_id` = `orders`.`items`.`d_order_type`))) join `orders`.`unit_quantity` on((`orders`.`unit_quantity`.`uq_id` = `orders`.`items`.`d_order_quantity`)));

############
############

create view itemDetails as
select i_name as name,
	(select d_name from dists 
	where dists.d_id = items.i_dist) as dist,
	(select it_name from item_types
	where item_types.it_id = items.i_type) as type,
	items.i_par as par,
	(select order_units.ou_name from order_units
	where order_units.ou_id = items.d_order_type) as order_unit,
	(select unit_quantity.uq_name from unit_quantity
	where unit_quantity.uq_id = items.d_order_quantity) as order_quantity,
	items.default_order as default_num,
	items.on_hand
 from items
 join dists on dists.d_id = items.i_dist
 join item_types on item_types.it_id = items.i_type
 join order_units on order_units.ou_id = items.d_order_type
 join unit_quantity on unit_quantity.uq_id = items.d_order_quantity;


##############

create view itemDetails as
select i_name as name,
	(select d_name from dists 
	where dists.d_id = items.i_dist) as dist,
	items.i_type as type,
	items.i_par as par,
	(select order_units.ou_name from order_units
	where order_units.ou_id = items.d_order_type) as order_unit,
	(select unit_quantity.uq_name from unit_quantity
	where unit_quantity.uq_id = items.d_order_quantity) as order_quantity,
	items.default_order as default_num,
	items.on_hand
 from items
 join dists on dists.d_id = items.i_dist
 join item_types on item_types.it_id = items.i_type
 join order_units on order_units.ou_id = items.d_order_type
 join unit_quantity on unit_quantity.uq_id = items.d_order_quantity;
