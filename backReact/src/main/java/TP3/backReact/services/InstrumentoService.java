package TP3.backReact.services;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.repository.InstrumentoRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfDiv;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

@Service
public class InstrumentoService implements IInstrumentoService{

    protected static Font titulo = new Font(Font.FontFamily.COURIER, 24, Font.BOLD);
    protected static Font redFont = new Font(Font.FontFamily.COURIER,12f, Font.NORMAL, BaseColor.RED);
    protected static Font textoHeader = new Font(Font.FontFamily.COURIER, 10, Font.BOLD, BaseColor.LIGHT_GRAY);
    protected static Font textoTwenty = new Font(Font.FontFamily.COURIER, 20, Font.NORMAL);
    protected static Font texto = new Font(Font.FontFamily.COURIER, 14, Font.NORMAL);
    protected static Font textoBold = new Font(Font.FontFamily.COURIER, 11, Font.BOLD);
    protected static Font textoMini = new Font(Font.FontFamily.COURIER, 10, Font.NORMAL);
    protected static Font textoMiniWhite = new Font(Font.FontFamily.COURIER, 10, Font.NORMAL,BaseColor.WHITE);
    protected static Font textoMiniBold = new Font(Font.FontFamily.COURIER, 8, Font.BOLD);
    protected static Font textoBig = new Font(Font.FontFamily.COURIER, 50, Font.BOLD);
    protected static Font textoWhite = new Font(Font.FontFamily.COURIER, 4, Font.BOLD,BaseColor.WHITE);
    @Autowired
    private InstrumentoRepository repository;
    @Override

    public List<Instrumento> getAll(){
        return repository.findAll();
    }

    @Override
    public Instrumento getById(Integer id) {
        return repository.findById(id).get();
    }

    @Override
    public Instrumento postData(Instrumento instrumento) {
        return repository.save(instrumento);
    }

    @Override
    public Instrumento putData(Integer id, Instrumento entity) {
        Optional<Instrumento> instrumentoOptional = repository.findById(id);
        Instrumento instrumento = instrumentoOptional.get();
        instrumento = repository.save(entity);
        return instrumento;
    }

    @Override
    public boolean deleteData(Integer id) throws Exception {
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }else {
            throw new Exception();
        }
    }

    public void imprimirPdf(Integer id, ByteArrayOutputStream outputStream){
        try{
            Document document = new Document(PageSize.A4,30,30,30,30);

            Instrumento instrumento  = repository.findById(id).get();

            PdfWriter.getInstance(document,outputStream);

            //Abrimos el documento
            document.open();

            PdfPTable body = new PdfPTable(2);

            body.setWidthPercentage(100); // Ancho de la tabla en porcentaje
            body.setWidths(new float[]{60, 40}); // Anchos de las columnas en porcentaje

            // Crear una celda vacía para la primera columna, ya que no queremos más contenido ahí
            Paragraph emptyLine = new Paragraph();


            // Añadir una imagen que ocupe varias filas en la primera columna
            Image image = Image.getInstance("http://localhost:8080/images/"+instrumento.getImagen());
            PdfPCell imageCell = new PdfPCell(image, true);
            imageCell.setRowspan(7); // Hacer que la celda ocupe 5 filas
            imageCell.setHorizontalAlignment(Element.ALIGN_CENTER); // Centrar la imagen
            imageCell.setBorder(Rectangle.NO_BORDER);
            body.addCell(imageCell);


            // Añadir más contenido a la segunda columna con una fuente roja, mientras que la primera columna sigue ocupada por la imagen
            body.addCell(createTextCell(instrumento.getCantidadVendida()+" vendidos", textoHeader,0));
            body.addCell(createTextCell(instrumento.getInstrumento(), titulo,0));
            // Crear una celda vacía para la primera columna, ya que no queremos más contenido ahí
            body.addCell(createTextCell(" ",texto,0));
            body.addCell(createTextCell("$"+instrumento.getPrecio(), textoTwenty,15));
            body.addCell(createTextCell(" ",texto,0));
            body.addCell(createTextCell("Marca: "+instrumento.getMarca(), textoMini,0));
            body.addCell(createTextCell("Modelo: "+instrumento.getModelo(), textoMini,0));

            // Añadir contenido a la primera columna debajo de la imagen
            body.addCell(createTextCell("Descripción:", texto,0));

            body.addCell(createTextCell("Esta es una descripción detallada del instrumento. Esta es una descripción detallada del instrumento. Esta es una descripción detallada del instrumento.", textoWhite,0));
            body.addCell(createTextCell(instrumento.getDescripcion(), textoMini,0));
            body.addCell(createTextCell("Esta es una descripción detallada del instrumento. Esta es una descripción detallada del instrumento. Esta es una descripción detallada del instrumento.", textoMiniWhite,0));

            // Añadir la tabla al documento
            document.add(body);

            document.close();

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    private static PdfPCell createTextCell(String text, Font font,float leading) {
        Paragraph paragraph =new Paragraph(text, font);
        paragraph.setLeading(leading);
        PdfPCell cell = new PdfPCell(paragraph);
        cell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
        cell.setBorder(Rectangle.NO_BORDER);
        return cell;
    }

}
