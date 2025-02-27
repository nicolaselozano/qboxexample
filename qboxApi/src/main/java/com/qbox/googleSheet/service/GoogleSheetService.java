package com.qbox.googleSheet.service;

import com.google.api.client.auth.oauth2.BearerToken;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.qbox.googleSheet.config.AppConfig;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@Service
@AllArgsConstructor
public class GoogleSheetService {

    private final AppConfig appConfig;
    private static final String APPLICATION_NAME = "Google Sheets API Java";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    public List<List<Object>> getSheetData(String spreadsheetId, String range) throws IOException, GeneralSecurityException {

        Sheets sheetsService = new Sheets.Builder(
                GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, null)
                .setApplicationName(APPLICATION_NAME)
                .build();

        ValueRange response = sheetsService.spreadsheets().values()
                .get(spreadsheetId, range)
                .setKey(appConfig.getProperty("API_KEY_CLOUD"))
                .execute();

        return response.getValues();
    }
}

