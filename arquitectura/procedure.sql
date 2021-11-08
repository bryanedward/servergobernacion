
-- actualizacion 24 /10/21
--esta funcion hace relacion a la ruta saveReport para guardar una ficha general de los equipos
CREATE OR REPLACE PROCEDURE public.guardareportequipop(cod_equipo character varying, descrip_equipo character varying, 
												  fechactrol_equipo date, firma_equipo character varying, 
												  grupoctrol_equipo text,pfced_usuario character varying, 
												  pfcod_departament integer,arraycomponents text, 
												  pfcod_proveed integer, nomb_soft character varying, 
												  descrip_soft character varying, licencia_soft text)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
 omgjson json := arrayComponents;
 i json;
BEGIN
	INSERT INTO thistctrolequipo(cod_equipo, descrip_equipo,fechactrol_equipo, firma_equipo, 
	pfced_usuario, pfcod_departament,grupoctrol_equipo) 
    VALUES (cod_equipo, descrip_equipo,fechactrol_equipo, firma_equipo, 
	pfced_usuario, pfcod_departament,grupoctrol_equipo);	
	FOR i IN SELECT * FROM json_array_elements(omgjson)
  	LOOP
	INSERT INTO tmaecomponent ( descrip_component, marca_component, model_component, 
	 numerser_component, pfcod_proveed, pfcod_equipo) 
	 VALUES (i->>'descrip_component', i->>'marca_component', i->>'model_component', 
	 i->>'numerser_component', CAST(i->>'pfcod_proveed' AS INTEGER), i->>'pfcod_equipo' );
  END LOOP;
  INSERT INTO tmaesoft( nomb_soft, descrip_soft, licencia_soft, pfcod_proveed, pfcod_equipo) 
	 VALUES ( nomb_soft, descrip_soft, licencia_soft, pfcod_proveed, cod_equipo);
END;
$procedure$

-- actualizacion 18/10/21
-- guardar el reprte general de red hace referencia con la ruta /saveReportRed
CREATE OR REPLACE PROCEDURE public.guardareportRed(
	cod_fichared character varying,observacion_fichared character varying,
	tipo_fichared character varying,pfced_usuario character varying, 
pfcedtec_usuario character varying,pfcedjef_usuario character varying,
componentesred text)

 LANGUAGE plpgsql
AS $procedure$
DECLARE
 omgjson json := componentesred;
 i json;
BEGIN
INSERT INTO tmaefichared(cod_fichared,observacion_fichared, tipo_fichared,pfced_usuario, 
pfcedtec_usuario, pfcedjef_usuario) 
VALUES ( cod_fichared,observacion_fichared,tipo_fichared,pfced_usuario, 
pfcedtec_usuario, pfcedjef_usuario);

	FOR i IN SELECT * FROM json_array_elements(omgjson)
  	LOOP
	 INSERT INTO tmaecomponentred
	( codserial_componentred, 
	 descrip_componentred, marca_componentred, modelo_componentred, 
	 macaddress_componentred, ipaddress_componentred
, numerser_componentred, pfcod_fichared, pfcod_departament) VALUES (i->>'codserial_componentred', 
			 i->>'descrip_componentred', i->>'marca_componentred', 
	 		 i->>'modelo_componentred', i->>'macaddress_componentred' , 
			 i->>'ipaddress_componentred',i->>'numerser_componentred',
			i->>'pfcod_fichared', CAST(i->>'pfcod_departament' AS INTEGER));
  END LOOP;
END;
$procedure$



-- guarda reporte general de red cerrado


CREATE OR REPLACE PROCEDURE guardarreportcerradored(
cod_fichared character varying,observacion_fichared character varying, 
tipo_fichared character varying,pfced_usuario character varying, 
pfcedtec_usuario character varying,pfcedjef_usuario character varying,
componentesred text)
LANGUAGE plpgsql
AS 
$procedure$
DECLARE
omgjson json := componentesred;
i json;
BEGIN
INSERT INTO tmaefichared(cod_fichared,observacion_fichared, tipo_fichared, pfced_usuario, pfcedtec_usuario, pfcedjef_usuario) 
VALUES(cod_fichared,observacion_fichared, tipo_fichared, pfced_usuario, pfcedtec_usuario, pfcedjef_usuario);
FOR i IN SELECT * FROM json_array_elements(omgjson)
LOOP
INSERT INTO tmaecomponentred(descrip_componentred, marca_componentred, modelo_componentred, 
macaddress_componentred, ipaddress_componentred, numerser_componentred, pfcod_fichared, pfcod_departament) 
VALUES (i->>'descrip_componentred', i->>'marca_componentred', i->>'modelo_componentred', 
i->>'macaddress_componentred' , i->>'ipaddress_componentred',i->>'numerser_componentred',
i->>'pfcod_fichared', CAST(i->>'pfcod_departament' AS INTEGER));
END LOOP;
END;
$procedure$


--actualizar token y insert asistencia // funcion probable
create or replace function tokenregistusuar(tokenusuario text, cedulausuar text)
returns table(token_usuar text)
as
$body$
INSERT INTO thistasistencia(cedul_usuar) values(cedulausuar);
update tmaeusuar set token_usuar = tokenusuario 
                where cedul_usuar = cedulausuar RETURNING token_usuar;
$body$
language sql;

-- function para actualizar la asistencia cada vez que un ingrese actualiza el registro
CREATE or replace FUNCTION actualizaregistro() 
   RETURNS TRIGGER 
AS $$
BEGIN
IF NOT EXISTS(SELECT 1 FROM  thistasistencia where fecha_asistencia = CURRENT_DATE) then
	INSERT INTO thistasistencia(fecha_asistencia, cedul_usuar) values (current_date, old.cedul_usuar);
END IF;
RETURN NEW;
END;
$$
LANGUAGE PLPGSQL
create trigger tr_insert after update on tmaeusuar for each row execute procedure actualizaregistro() 
