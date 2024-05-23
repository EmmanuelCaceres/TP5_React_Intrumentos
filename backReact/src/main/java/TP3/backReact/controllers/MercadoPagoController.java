package TP3.backReact.controllers;
import TP3.backReact.entities.PagoMP;
import TP3.backReact.entities.PreferenceMp;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(value = "*")
@RestController
public class MercadoPagoController {


    public PreferenceMp getPreferenceId(PagoMP pagoMP) throws MPException, MPApiException {
                                        //TEST-3400765148504408-052219-85ecd43ecec0a8e328b2e99296456f8c-258100972

        MercadoPagoConfig.setAccessToken("TEST-3400765148504408-052219-85ecd43ecec0a8e328b2e99296456f8c-258100972");

        PreferenceItemRequest itemRequest =
                PreferenceItemRequest.builder()
                        .id("1234")
                        .title(pagoMP.getNombre())
                        .description("PS5")
                        .quantity(1)
                        .currencyId("ARG")
                        .unitPrice(new BigDecimal(pagoMP.getMontoTotal()))
                        .build();
        List<PreferenceItemRequest> items = new ArrayList<>();
        items.add(itemRequest);


        PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/").failure("http://localhost:5173/instrumentos").build();

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .backUrls(backURL)
                .build();
        PreferenceClient client = new PreferenceClient();
        Preference preference = client.create(preferenceRequest);

        PreferenceMp preferenceMpEntity = new PreferenceMp();
        preferenceMpEntity.setIdPreference(preference.getId());
        preferenceMpEntity.setStatusCode(preference.getResponse().getStatusCode());

        return preferenceMpEntity;

    }

    @PostMapping("create_preference_mp")
    public PreferenceMp createPreferenciaMercadoPago(@RequestBody PagoMP pagoMP) throws MPException, MPApiException {
        MercadoPagoController cMercadoPago = new MercadoPagoController();
        PreferenceMp preferenceMp = cMercadoPago.getPreferenceId(pagoMP);
        return preferenceMp;
    }


}
