<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="text" encoding="UTF-8" media-type="text/json"/>
	<xsl:template match="/">
		<xsl:apply-templates></xsl:apply-templates>
	</xsl:template>
	<xsl:template match="*[*]">
	<xsl:if test="local-name() != 'ResponseItem'">{</xsl:if>
	<xsl:choose>
		<xsl:when test="local-name() = 'ResponseItem'">
			"<xsl:value-of select="@CanonicalObjectTypeId"/>" : 
		</xsl:when>
		<xsl:when test="local-name() = 'ResponsePerCountry'">
			"<xsl:value-of select="@CountryCode"/>" :
		</xsl:when>
		<xsl:when test="local-name() = 'Provision'">
			"Provision" : {
			<xsl:for-each select="./*">
			"<xsl:value-of select="local-name()"></xsl:value-of>" : "<xsl:value-of select="./text()"></xsl:value-of>" <xsl:if test="position() != last()">,</xsl:if>
			</xsl:for-each>}
		</xsl:when>
	</xsl:choose>
	<xsl:apply-templates select="*[*]"></xsl:apply-templates>
	<xsl:if test="local-name() != 'ResponseItem'">}</xsl:if> <xsl:if test="position() != last()">,</xsl:if>
	</xsl:template>
	
</xsl:stylesheet>