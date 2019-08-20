create view itemOrderHistory as
select distinct items.i_name as Name,
items.on_hand as On_Hand,
	(select sum(ordered.o_quantity) from ordered
	where ordered.o_name = items.i_name AND ordered.o_unit = (
		select order_units.ou_name from order_units
		where order_units.ou_id = items.d_order_type
	)) as Total,
	(select order_units.ou_name from order_units
	where order_units.ou_id = items.d_order_type) as Unit,
	(select unit_quantity.uq_name from unit_quantity
	where unit_quantity.uq_id = items.d_order_quantity) as Unit_Quantity,
	items.i_type as Type,
	(select min(ordered.o_date) from ordered
	where ordered.o_name = items.i_name) as DateStart,
	(select max(ordered.o_date) from ordered
	where ordered.o_name = items.i_name) as EndDate,
	(select count(o_date) from ordered
	where ordered.o_name = items.i_name AND ordered.o_unit = (
		select order_units.ou_name from order_units
		where order_units.ou_id = items.d_order_type
	)) as OrderedCount
	from items
	join ordered on items.i_name = ordered.o_name
	join order_units on items.d_order_type = order_units.ou_id
	join unit_quantity on items.d_order_quantity = unit_quantity.uq_id;
	
##############


CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `orders`.`itemorderhistory` AS select distinct `orders`.`items`.`i_name` AS `Name`,`orders`.`items`.`on_hand` AS `On_Hand`,(select sum(`orders`.`ordered`.`o_quantity`) from `orders`.`ordered` where ((`orders`.`ordered`.`o_name` = `orders`.`items`.`i_name`) and (`orders`.`ordered`.`o_unit` = (select `orders`.`order_units`.`ou_name` from `orders`.`order_units` where (`orders`.`order_units`.`ou_id` = `orders`.`items`.`d_order_type`))))) AS `Total`,(select `orders`.`order_units`.`ou_name` from `orders`.`order_units` where (`orders`.`order_units`.`ou_id` = `orders`.`items`.`d_order_type`)) AS `Unit`,(select `orders`.`unit_quantity`.`uq_name` from `orders`.`unit_quantity` where (`orders`.`unit_quantity`.`uq_id` = `orders`.`items`.`d_order_quantity`)) AS `Unit_Quantity`,`orders`.`items`.`i_type` AS `Type`,(select min(`orders`.`ordered`.`o_date`) from `orders`.`ordered` where (`orders`.`ordered`.`o_name` = `orders`.`items`.`i_name`)) AS `DateStart`,(select max(`orders`.`ordered`.`o_date`) from `orders`.`ordered` where (`orders`.`ordered`.`o_name` = `orders`.`items`.`i_name`)) AS `EndDate`,(select count(`orders`.`ordered`.`o_date`) from `orders`.`ordered` where ((`orders`.`ordered`.`o_name` = `orders`.`items`.`i_name`) and (`orders`.`ordered`.`o_unit` = (select `orders`.`order_units`.`ou_name` from `orders`.`order_units` where (`orders`.`order_units`.`ou_id` = `orders`.`items`.`d_order_type`))))) AS `OrderedCount` from (((`orders`.`items` join `orders`.`ordered` on((`orders`.`items`.`i_name` = `orders`.`ordered`.`o_name`))) join `orders`.`order_units` on((`orders`.`items`.`d_order_type` = `orders`.`order_units`.`ou_id`))) join `orders`.`unit_quantity` on((`orders`.`items`.`d_order_quantity` = `orders`.`unit_quantity`.`uq_id`)));
