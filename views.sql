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
    items.default_order as default_num
 from items
 join dists on dists.d_id = items.i_dist
 join item_types on item_types.it_id = items.i_type
 join order_units on order_units.ou_id = items.d_order_type
 join unit_quantity on unit_quantity.uq_id = items.d_order_quantity;



create view itemOrderHistory as
select distinct items.i_name as name,
	(select sum(ordered.o_quantity) from ordered
    where ordered.o_name = items.i_name AND ordered.o_unit = (
		select order_units.ou_name from order_units
        where order_units.ou_id = items.d_order_type
    )) as total,
    (select order_units.ou_name from order_units
    where order_units.ou_id = items.d_order_type) as unit,
    (select unit_quantity.uq_name from unit_quantity
    where unit_quantity.uq_id = items.d_order_quantity) as unit_quantity
    from items
join ordered on items.i_name = ordered.o_name
join order_units on items.d_order_type = order_units.ou_id
join unit_quantity on items.d_order_quantity = unit_quantity.uq_id;