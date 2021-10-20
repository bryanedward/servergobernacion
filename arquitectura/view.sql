-- vista para obtener la list de los reportes creados
create or replace function componentred(cedulausuario text)
returns table(cod_fichared text,observacion_fichared text,tipo_fichared text, nombreusuario text)
as
$body$
	SELECT cod_fichared, observacion_fichared ,tipo_fichared,userx.nomb_usuar as nombreusuario FROM  tmaefichared
  INNER JOIN tmaeusuar userx ON pfced_usuario = userx.cedul_usuar
  INNER JOIN tmaeusuar userjef ON  pfcedjef_usuario = userjef.cedul_usuar
  INNER JOIN tmaeusuar usertec ON  pfcedtec_usuario = usertec.cedul_usuar
  WHERE pfced_usuario = cedulausuario;
$body$
language sql;
